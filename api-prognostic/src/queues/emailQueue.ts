import Queue, { DoneCallback, Job } from "bull";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { EMAIL, SENDGRID_API_KEY } from "../constants";
import { sendEmailFromService } from "../services/emailService";
import { IEmailData } from "../interfaces/emailData";
import axios from "axios";
import WebScanCampaignEmail from "../models/WebScanCampaignEmail";
import { MailDataRequired } from "@sendgrid/mail";
const sendgrid = require("@sendgrid/mail");

dotenv.config();
sendgrid.setApiKey(SENDGRID_API_KEY);

const emailQueue = new Queue("emailQueue", {
  redis: {
    host: "prognostic.redis.cache.windows.net", // Replace with Azure Redis hostname
    port: 6380, // Default Redis port
    password: "DummyPassword", // Replace with Azure Redis access key
    tls: { rejectUnauthorized: false }, // Ensure TLS works correctly for Azure Redis
    maxRetriesPerRequest: null, // Disable retry limit
    enableReadyCheck: false, // Avoid readiness check failures
    connectTimeout: 10000,
  },
  defaultJobOptions: {
    removeOnComplete: { age: 3600, count: 1000 }, // Keep max 1000 completed jobs or 1 hour
    removeOnFail: { age: 3600, count: 500 }, // Keep max 500 failed jobs or 1 hour
  },
});

// Ensure queue is ready
emailQueue.on("error", (err) => {
  console.error("Redis Queue Error:", err);
});

emailQueue.on("waiting", (jobId) => {
  console.log(`Job ${jobId} is waiting to be processed.`);
});

emailQueue.on("active", (job, jobPromise) => {
  console.log(`Processing job ${job.id}...`);
});

emailQueue.process(async (job: Job, done: DoneCallback) => {
  try {
    const emailData = job.data as IEmailData;

    // Validate emailData
    if (!emailData?.webscanSubmission?.email) {
      throw new Error("Invalid job data: Missing recipient email");
    }

    if (!emailData.webscanSubmission.webscanCampaign?.company) {
      throw new Error("Invalid job data: Missing company details");
    }

    // Prepare email options
    const emailOptions: MailDataRequired = {
      to: [{ email: emailData.webscanSubmission.email }],
      from: {
        email: emailData.webscanSubmission.webscanCampaign.company.smtpEmail,
        name: emailData.webscanSubmission.webscanCampaign.company.companyName,
      },
      subject:
        emailData.emailSubject ||
        emailData.webscanSubmission.webscanCampaign.company.companyName,
      content: [{ value: emailData.emailContent, type: "text/html" }],
    };

    // Fetch email record from database
    const email = await WebScanCampaignEmail.findByPk(emailData.id);
    if (!email)
      throw new Error(`Email record not found for ID: ${emailData.id}`);

    console.log(`Sending email to: ${emailData.webscanSubmission.email}`);

    try {
      // Send email using SendGrid
      await sendgrid.send(emailOptions);
      console.log("Email sent successfully");

      // Update email status
      await email.update({ status: "sent" });
      done(); // Mark job as completed
    } catch (sendError: any) {
      console.error("Error sending email:", sendError);

      if (sendError.response) {
        console.error("SendGrid error details:", sendError.response.body);
      }

      await email.update({ failureReason: sendError.message });
      done(new Error(`SMTP Error: ${sendError.message}`)); // Mark job as failed
    }
  } catch (generalError: any) {
    console.error("Unexpected error in email queue:", generalError.message);
    done(new Error(`Queue Processing Error: ${generalError.message}`)); // Mark job as failed
  }
});

// Periodically clean old jobs
const CLEANUP_INTERVAL = 1000 * 60 * 60; // 1 hour
setInterval(async () => {
  console.log("Cleaning up old jobs...");
  await emailQueue.clean(CLEANUP_INTERVAL);
  await emailQueue.clean(CLEANUP_INTERVAL, "failed");
}, CLEANUP_INTERVAL);

export default emailQueue;
