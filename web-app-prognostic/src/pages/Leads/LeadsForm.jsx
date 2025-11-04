import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addLead, updateLead, getLeadDetailById } from "services/actions/leads";
import Toast from "../../components/toast/Toast";

const LeadsForm = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        source: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState({ message: "", type: "", show: false });

    useEffect(() => {
        if (id) {
            const fetchLeadDetails = async () => {
                setIsLoading(true);
                try {
                    const response = await getLeadDetailById(id);
                    if (response) {
                        setInitialValues({
                            firstName: response.firstName || "",
                            lastName: response.lastName || "",
                            email: response.email || "",
                            source: response.source || "",
                        });
                    }
                } catch (error) {
                    console.error("Error fetching lead details:", error);
                    setToast({ message: "Failed to fetch lead details.", type: "error", show: true });
                } finally {
                    setIsLoading(false);
                }
            };
            fetchLeadDetails();
        }
    }, [id]);

    const handleSubmit = async (values, { setSubmitting }) => {
        setIsLoading(true);
        try {
            if (id) {
            
                await updateLead(id, values);
                setToast({ message: "Lead updated successfully!", type: "success", show: true });
            } else {
                
                await addLead(values);
                setToast({ message: "Lead added successfully!", type: "success", show: true });
            }

     
            setTimeout(() => navigate("/leads-list"), 1000);
        } catch (error) {
            console.error("Error saving lead:", error);
            setToast({ message: "Failed to save lead. Please try again.", type: "error", show: true });
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    const leadValidationSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        source: Yup.string().required("Source is required"),
    });

    return (
        <div className="p-6 min-h-screen">
            <div className="mb-4 text-gray-600">
                <span
                    className="cursor-pointer hover:text-blue-600"
                    onClick={() => navigate("/leads-list")}
                >
                    Leads
                </span>
                {" > "}
                <span className="font-semibold">{id ? "Edit Lead" : "Add Lead"}</span>
            </div>

            <h1 className="text-2xl font-bold mb-6">{id ? "Edit Lead" : "Add Lead"}</h1>

            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={leadValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4 bg-white p-6 rounded shadow">
                        <div>
                            <label className="block font-medium">First Name</label>
                            <Field
                                type="text"
                                name="firstName"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                            <label className="block font-medium">Last Name</label>
                            <Field
                                type="text"
                                name="lastName"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                            <label className="block font-medium">Email</label>
                            <Field
                                type="email"
                                name="email"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                            <label className="block font-medium">Source</label>
                            <Field
                                as="select"
                                name="source"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="">Select Source</option>
                                <option value="WEB">WEB</option>
                                <option value="PHONE">PHONE</option>
                                <option value="EMAIL">EMAIL</option>
                                <option value="REFERRAL">REFERRAL</option>
                                <option value="OTHER">OTHER</option>
                            </Field>
                            <ErrorMessage name="source" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || isLoading}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                            {isLoading ? "Saving..." : id ? "Update Lead" : "Add Lead"}
                        </button>
                    </Form>
                )}
            </Formik>

            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
        </div>
    );
};

export default LeadsForm;
