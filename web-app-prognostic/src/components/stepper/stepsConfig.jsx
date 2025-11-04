import Step1 from "pages/Form/InitialStep";  // New Step 1 for website URL
import Step2 from "pages/Form/StepForm1";  // Previous Step 1
import Step3 from "pages/Form/StepForm2";  // Previous Step 2
import Step4 from "pages/Form/StepForm3";  // Previous Step 3
import Step5 from "pages/Form/StepForm4";  // Previous Step 4

export const steps = [
  {
    name: "Step 1",
    heading: "Lets Get You Hooked Up",
    component: Step1,  
  },
  {
    name: "Step 2",
    heading: "Tell Us About Your Business",
    component: Step2, 
  },
  {
    name: "Step 3",
    heading: "Define Your Core Marketing Goals",
    component: Step3,  
  },
  {
    name: "Step 4",
    heading: "List Your Products and Offers",
    component: Step4, 
  },
  {
    name: "Step 5",
    heading: "Add Testimonials/Proof Elements",
    component: Step5,  
  },
];
