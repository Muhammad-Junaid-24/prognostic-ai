// validation.js
import { CampaignStatus } from "constants";
import * as Yup from "yup";

// Validation schema for the signup form
export const signupSchema = Yup.object({
  fullName: Yup.string()
    .matches(/^[^\d]/, "Name cannot start with a number")
    .required("Full Name is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone Number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should have a minimum length of 8")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email!")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters!")
    .required("Password is required"),
});

// Validation schema using Yup
export const step1Schema = Yup.object({
  companyName: Yup.string().required("Company Name is required"),
  industry: Yup.string().required("Industry is required"),
  products: Yup.string().required("Products/Services are required"),
  businessDescription: Yup.string().required(
    "Business description is required"
  ),
});

// Validation schema for Step2
export const step2Schema = Yup.object({
  primaryGoal: Yup.string().required("Primary Goal is required"),
  targetAudience: Yup.string().required("Target Audience is required"),
  primaryCustomerPainPoints: Yup.string().required(
    "Customer Pain Points are required"
  ),
});

// Validation schema for Step3
// Validation schema for Step3
// export const step3Schema = Yup.object({
//     offerName: Yup.string().required("Offer Name is required"),
//     price: Yup.number()
//       .required("Price is required")
//       .positive("Price must be a positive number"),
//     offerDescription: Yup.string().required("Offer Description is required"),
//     primaryBenefits: Yup.string().required("Primary Benefits are required"),
//     targetActionURL: Yup.string()
//     //   .url("Invalid URL format")
//       .required("Target Action URL is required"),
//   });

export const step4Schema = Yup.object({
  offers: Yup.array().of(
    Yup.object({
      offerName: Yup.string().required("Offer Name is required"),
      offerDescription: Yup.string().required("Offer Description is required"),
      offerGoal: Yup.string().required("Offer Goal is required"),
      offerTopic: Yup.string().required("Offer Topic is required"),
      primaryBenefits: Yup.string().required("Primary Benefits are required"),
      targetActionURL: Yup.string()
        .url("Invalid URL format")
        .required("Target Action URL is required"),
      price: Yup.string()
        .required("Price is required")
        .matches(
          /^\$?(?=.*\d)[\d,]+(?:\.\d{2})?$/,
          "Price must be a valid amount (e.g., 10,000 or 100,000)"
        ),
    })
  ),
});

export const InitialStepSchema = Yup.object().shape({
  websiteURL: Yup.string()
    .url("Please enter a valid URL")
    .required("Website URL is required"),
});

export const step5Schema = Yup.object({
  testimonials: Yup.string()
    .min(10, "Testimonial must be at least 10 characters long"),
});

export const step3Schema = Yup.object().shape({
  campaignName: Yup.string()
    .required("Campaign name is required")
    .max(50, "Campaign name cannot exceed 50 characters"),
  startDate: Yup.date()
    .required("Start date is required")
    .typeError("Invalid date format"),
  endDate: Yup.date()
    .required("End date is required")
    .typeError("Invalid date format")
    .min(Yup.ref("startDate"), "End date must be after the start date"),
  startTime: Yup.string()
    .required("Start time is required")
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  endTime: Yup.string()
    .required("End time is required")
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  status: Yup.string()
    .required("Status is required")
    .oneOf(Object.values(CampaignStatus), "Invalid status"),
});

export const CompanyFormValidationSchema = Yup.object({
  companyName: Yup.string().required("Company Name is required"),
  industry: Yup.string().required("Industry is required"),
  primaryProductsOrServices: Yup.string().required(
    "Products/Services are required"
  ),
  companyDescription: Yup.string().required("Business Description is required"),
  primaryGoal: Yup.string().required("Primary Goal is required"),
  targetAudience: Yup.string().required("Target Audience is required"),
  primaryCustomerPainPoints: Yup.string().required(
    "Customer Pain Points are required"
  ),
  testimonials: Yup.string().required("Testimonial is required"),
  offers: Yup.array()
    .of(
      Yup.object({
        offerName: Yup.string()
          .required("Offer name is required")
          .max(100, "Offer name must be less than 100 characters"),

        price: Yup.string()
          .required("Price is required")
          .matches(
            /^\$?(?=.*\d)[\d,]+(?:\.\d{2})?$/,
            "Price must be a valid amount (e.g., 10,000 or 100,000)"
          ),

        offerDescription: Yup.string()
          .required("Offer description is required")
          .min(10, "Description must be at least 10 characters")
          .max(1000, "Description must be less than 1000 characters"),

        primaryBenefits: Yup.string()
          .required("Primary benefits are required")
          .min(10, "Benefits must be at least 10 characters")
          .max(500, "Benefits must be less than 500 characters"),

        targetActionURL: Yup.string()
          .required("Target action URL is required")
          .url("Please enter a valid URL")
          .matches(
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
            "Please enter a valid URL"
          ),
      })
    )
    .min(1, "At least one offer is required"),
});

// changePasswordSchema
export const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),
  confirmNewPassword: Yup.string()
    .required("Please confirm your new password")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

//businessDetailsSchema
export const businessDetailsSchema = Yup.object().shape({
  companyName: Yup.string().required("Company Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  productOverview: Yup.string().required("Product Overview is required"),
  targetAudience: Yup.string().required("Target Audience is required"),
});

//SMTP
export const SMTPSchema = Yup.object({
  serverAddress: Yup.string().required("Server address is required"),
  port: Yup.number()
    .required("Port is required")
    .typeError("Port must be a number"),
  encryptionType: Yup.string().required("Encryption type is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const updateProfileSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, "Phone Number must be numeric")
    .required("Phone Number is required"),
  image: Yup.mixed()
    .test(
      "fileType",
      "Unsupported file type",
      (value) =>
        value ? ["image/jpeg", "image/png"].includes(value.type) : true // Allow empty initially
    )
    .test(
      "fileSize",
      "File too large (max 2MB)",
      (value) => (value ? value.size <= 2000000 : true) // Allow empty initially
    ),
});

export const optInFormSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  website: Yup.string()
    .url("Invalid URL format")
    .required("Website is required"),
});

export const campaignValidationSchema = Yup.object().shape({
  campaignName: Yup.string()
    .required("Campaign Name is required")
    .max(100, "Campaign Name must be less than 100 characters"),
  startDate: Yup.date().required("Start Date is required").nullable(),
  endDate: Yup.date()
    .required("End Date is required")
    .nullable()
    .min(Yup.ref("startDate"), "End Date cannot be earlier than Start Date"),
  creationDate: Yup.date().required("Creation Date is required").nullable(),
  startTime: Yup.string().required("Start Time is required"),
  endTime: Yup.string().required("End Time is required"),
  type: Yup.string().required("Type is required"),
  status: Yup.string().required("Status is required"),
});

export const offeringValidationSchema = Yup.object().shape({
  offerName: Yup.string()
    .required("Offer name is required")
    .max(100, "Offer name must be less than 100 characters"),

  price: Yup.string()
    .required("Price is required")
    .matches(
      /^\$?(?=.*\d)[\d,]+(?:\.\d{2})?$/,
      "Price must be a valid amount (e.g., 10,000 or 100,000)"
    ),

  offerDescription: Yup.string()
    .required("Offer description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),

  primaryBenefits: Yup.string()
    .required("Primary benefits are required")
    .min(10, "Benefits must be at least 10 characters")
    .max(500, "Benefits must be less than 500 characters"),

  targetActionURL: Yup.string()
    .required("Target action URL is required")
    .url("Please enter a valid URL")
    .matches(
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
      "Please enter a valid URL"
    ),
});

export const UnifiedFormValidationSchema = Yup.object({
  companyName: Yup.string()
    .required("Company Name is required")
    .min(3, "Company Name must be at least 3 characters"),
  industry: Yup.string().required("Industry is required"),
  primaryProductsOrServices: Yup.string()
    .required("Products/Services are required")
    .min(10, "Products/Services must be at least 10 characters"),
  companyDescription: Yup.string()
    .required("Business Description is required")
    .min(20, "Description must be at least 20 characters"),
  primaryGoal: Yup.string().required("Primary Goal is required"),
  targetAudience: Yup.string()
    .required("Target Audience is required")
    .min(10, "Target Audience must be at least 10 characters"),
  primaryCustomerPainPoints: Yup.string()
    .required("Customer Pain Points are required")
    .min(10, "Pain Points must be at least 10 characters"),
  testimonials: Yup.string()
    .required("Testimonial is required")
    .min(10, "Testimonial must be at least 10 characters"),
});

export const webscanSchema = Yup.object().shape({
  campaignName: Yup.string()
    .required("Campaign name is required")
    .max(100, "Campaign name cannot exceed 100 characters"),
  
  testimonial: Yup.string(),

  offers: Yup.array()
    .of(
      Yup.object().shape({
        offerName: Yup.string()
          .required("Offer name is required")
          .max(100, "Offer name cannot exceed 100 characters"),
        offerDescription: Yup.string()
          .required("Offer description is required")
          .max(500, "Offer description cannot exceed 500 characters"),
        offerGoal: Yup.string()
          .required("Offer goal is required")
          .max(300, "Offer goal cannot exceed 300 characters"),
        price: Yup.string()
          .required("Price is required")
          .min(0, "Price cannot be negative")
          .max(1000000, "Price cannot exceed 1,000,000"),
        offerTopic: Yup.string()
          .required("Offer topic is required")
          .max(300, "Offer topic cannot exceed 300 characters"),
        primaryBenefits: Yup.string()
          .required("Primary benefits are required")
          .max(500, "Primary benefits cannot exceed 500 characters"),
        targetActionURL: Yup.string()
          .url("Must be a valid URL")
          .required("Target action URL is required"),
      })
    )
    .required("You must provide at least one offer")
    .min(1, "You must provide at least one offer"),
});
