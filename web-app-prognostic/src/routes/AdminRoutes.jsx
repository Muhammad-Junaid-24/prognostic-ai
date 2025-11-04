import CampaignDetails from "pages/Campaigns/CampaignDetails";
import CampaignForm from "pages/Campaigns/CampaignForm";
import MarketingEmails from "pages/Campaigns/MarketingEmails";
// import Companies from "pages/Companies/Company";
// import CompanyForm from "pages/Companies/CompanyForm";
// import OfferingsForm from "pages/Offerings/OfferingForm";

import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Homepage = lazy(() => import("../pages/Home"));
const Billing = lazy(() => import("../pages/Billing"));
const Settings = lazy(() => import("pages/settings/Settings"));
const Campaigns = lazy(() => import("../pages/Campaigns/Campaigns"));
// const Offerings = lazy(() => import("../pages/Offerings/Offerings"));
// const Integration = lazy(() => import("../pages/Integration"));
// const CompanyDetails = lazy(() => import("../pages/Companies/CompanyDetails"));
const ChangePassword = lazy(() => import("pages/settings/ChangePassword"));
const UpdateProfile = lazy(() => import("pages/settings/UpdateProfile"));
// const BusinessDetails = lazy(() => import("pages/settings/BusinessDetails"));
// const SMTPSettings = lazy(() => import("pages/settings/SMTPSettings"));
const SMTPEmail = lazy(() => import("pages/settings/SMTPEmail"));
const LeadsList = lazy(() => import("pages/Leads/LeadsList"));
// const LeadsForm = lazy(() => import("pages/Leads/LeadsForm"));
const Webscan = lazy(() => import("pages/Web-Scan/webScan"));

const adminRoutes = [
  { path: "/home", element: <Homepage /> },
  { path: "/billing", element: <Billing /> },
  {
    path: "/settings",
    element: <Settings />,
    children: [
      // { index: true, element: <Navigate to="password" replace /> },
      { path: "", element: <Navigate to="password" replace /> },
      // { index: true, element: <ChangePassword /> },
      { path: "password", element: <ChangePassword /> },
      { path: "profile", element: <UpdateProfile /> },
      // { path: "business-details", element: <BusinessDetails /> },
      // { path: "SMTP-Settings", element: <SMTPSettings /> },
      { path: "SMTPEmail", element: <SMTPEmail /> },
    ],
  },
  // { path: "/campaigns", element: <Campaigns /> },
  { path: "/campaigns", element: <Campaigns /> },
  // { path: "/companies", element: <Companies /> },
  {
    path: "/webscan-campaign-form",
    element: <Webscan />,
  },
  {
    path: "/quiz-campaign-form",
    element: <Webscan />,
  },
  // { path: "/offers", element: <Offerings /> },
  // { path: "/offerings/add", element: <OfferingsForm /> },
  // { path: "/company/add", element: <CompanyForm /> },
  // { path: "/company/edit/:id", element: <CompanyForm /> },
  // { path: "/offer/edit/:id", element: <OfferingsForm /> },
  { path: "/campaigns/add", element: <CampaignForm /> },
  { path: "/campaigns/edit/:id", element: <CampaignForm /> },
  // { path: "/integration", element: <Integration /> },
  // { path: "/company-details", element: <CompanyDetails /> },
  { path: "/campaign/:id", element: <CampaignDetails /> },
  { path: "/marketing-emails/:id", element: <MarketingEmails /> },
  { path: "/conversion-cores-list", element: <LeadsList /> },
  // { path: "/Leads/add", element: <LeadsForm /> },
  // { path: "/Leads/edit/:id", element: <LeadsForm /> },
];

export default adminRoutes;
