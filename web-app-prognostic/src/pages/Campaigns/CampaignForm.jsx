import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { campaignValidationSchema } from "../../utils/validations";
import {
    addCampaign,
    updateCampaign,
    getCampaignDetailById,
} from "../../services/actions/campaigns";
import { useSelector } from "react-redux";
import Toast from "../../components/toast/Toast";

const CampaignForm = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const companyDetails = useSelector((state) => state.auth.companyDetails);
    const userId = useSelector((state) => state.auth.user.id);
    const companyId = companyDetails?.id;

    const [initialValues, setInitialValues] = useState({
        campaignName: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        type: "",
        status: "",
        creationDate: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState({ message: "", type: "", show: false }); 

    useEffect(() => {
        if (id) {
            const fetchCampaignDetails = async () => {
                try {
                    setIsLoading(true);
                    const response = await getCampaignDetailById(id);
                    setInitialValues({
                        ...response,
                        startDate: response.startDate.split("T")[0],
                        endDate: response.endDate.split("T")[0],
                        creationDate: response.creationDate.split("T")[0],
                    });
                    setIsLoading(false);
                } catch (error) {
                    console.error("Failed to fetch campaign details", error);
                    setToast({ message: "Failed to load campaign details.", type: "error", show: true });
                    setIsLoading(false);
                }
            };
            fetchCampaignDetails();
        }
    }, [id]);
    
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setIsLoading(true);
    
            
            const { user, id: _, createdAt, company, updatedAt, ...payload } = values; 
            payload.companyId = companyId; 
            payload.userId = userId; 
    
            if (id) {
                
                await updateCampaign(id, payload);
                setToast({ message: "Campaign updated successfully!", type: "success", show: true });
            } else {
              
                const response = await addCampaign(payload);
                setToast({ message: "Campaign created successfully!", type: "success", show: true });
    
              
            }
    
     
            setTimeout(() => {
                navigate("/campaign-overeview");
            }, 1000);
        } catch (error) {
            console.error("Failed to save campaign", error);
            setToast({ message: "Failed to save campaign.", type: "error", show: true });
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };
    
    

    return (
        <div className="p-6 min-h-screen">
            {/* Breadcrumbs */}
            <div className="mb-4 text-gray-600">
                <span
                    className="cursor-pointer hover:text-blue-600"
                    onClick={() => navigate("/campaign-overeview")}
                >
                    Campaigns
                </span>
                {" > "}
                <span className="font-semibold">
                    {id ? "Edit Campaign" : "Add Campaign"}
                </span>
            </div>

            <h1 className="text-2xl font-bold mb-6">
                {id ? "Edit Campaign" : "Add Campaign"}
            </h1>

            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={campaignValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4 bg-white p-6 rounded shadow">
                        {/* Campaign Name */}
                        <div>
                            <label className="block font-medium">Campaign Name</label>
                            <Field
                                type="text"
                                name="campaignName"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            <ErrorMessage
                                name="campaignName"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Start Date</label>
                                <Field
                                    type="date"
                                    name="startDate"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                                <ErrorMessage
                                    name="startDate"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">End Date</label>
                                <Field
                                    type="date"
                                    name="endDate"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                                <ErrorMessage
                                    name="endDate"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>
                        </div>

                        {/* Times */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Start Time</label>
                                <Field
                                    type="time"
                                    name="startTime"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                                <ErrorMessage
                                    name="startTime"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">End Time</label>
                                <Field
                                    type="time"
                                    name="endTime"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                                <ErrorMessage
                                    name="endTime"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>
                        </div>

                        {/* Type */}
                        <div>
                            <label className="block font-medium">Type</label>
                            <Field
                                as="select"
                                name="type"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="">Select Type</option>
                                <option value="web_scan">Web Scan</option>
                                <option value="quiz">Quiz</option>
                            </Field>
                            <ErrorMessage
                                name="type"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block font-medium">Status</label>
                            <Field
                                as="select"
                                name="status"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="">Select Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="draft">Draft</option>
                                <option value="completed">Completed</option>
                            </Field>
                            <ErrorMessage
                                name="status"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        {/* Creation Date */}
                        <div>
                            <label className="block font-medium">Creation Date</label>
                            <Field
                                type="date"
                                name="creationDate"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            <ErrorMessage
                                name="creationDate"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting || isLoading}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                            {isLoading ? "Saving..." : id ? "Update Campaign" : "Add Campaign"}
                        </button>
                    </Form>
                )}
            </Formik>

            {/* Toast Component */}
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

export default CampaignForm;
