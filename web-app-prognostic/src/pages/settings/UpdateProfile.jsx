import React, { useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { FiUpload } from "react-icons/fi";
import { updateProfileSchema } from "utils/validations";
import Phone from "assets/pngs/settings/phone.png";
import User from "assets/pngs/settings/user.png";
import AddImage from "assets/pngs/settings/gallery-add.png";
import Toast from "components/toast/Toast";
import { updateUserProfile } from "../../services/actions/auth";
import { updateUserData } from "store/Slices/authSlice";

const UpdateProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [imagePreview, setImagePreview] = useState(user?.profileImage || null);

  const formik = useFormik({
    initialValues: {
      fullName: user?.name || "",
      phoneNumber: user?.phoneNumber || "",
      image: null,
    },
    validationSchema: updateProfileSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      if (!user?.id) {
        setToast({
          show: true,
          message: "User ID is missing.",
          type: "error",
        });
        return;
      }

      const formData = new FormData();
      formData.append("id", user.id);
      formData.append("name", values.fullName);
      formData.append("phoneNumber", values.phoneNumber);

      if (values.image) {
        // console.log("values.image" , values.image);

        formData.append("profileImage", values.image);
      }

      // for (const pair of formData.entries()) {
      // console.log(`${pair[0]}:`, pair[1]);
      // }

      try {
        // console.log("formData" , formData);
        const response = await updateUserProfile(formData);
        if (response?.success) {
          dispatch(
            updateUserData({
              name: values.fullName,
              phoneNumber: values.phoneNumber,
              profileImage: values.image
                ? URL.createObjectURL(values.image)
                : user.profileImage,
            })
          );
          setToast({
            show: true,
            message: "Profile updated successfully!",
            type: "success",
          });
        } else {
          setToast({
            show: true,
            message: response?.message || "Failed to update profile.",
            type: "error",
          });
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        setToast({
          show: true,
          message: "An error occurred while updating the profile.",
          type: "error",
        });
      }
    },
  });

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     // Set image preview
  //     setImagePreview(URL.createObjectURL(file));
  //     // Set the file value in Formik
  //     formik.setFieldValue("image", file);
  //   }
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      formik.setFieldValue("image", file);
    }
  };

  return (
    <div className="bg-white pb-8">
      <h2 className="text-xl font-semibold mb-6">
        Update Your Profile Information
      </h2>
      <div className="border-t border-[#E6EFF5] my-4"></div>
      <form onSubmit={formik.handleSubmit} className="flex space-x-10">
        {/* Left Side Form */}
        <div className="flex-1 space-y-6">
          <div>
            {/* <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label> */}
            <div className="relative flex items-center h-12">
              <img
                src={User}
                alt="User Icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
              />
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your full name"
                className={`w-full pl-12 pr-4 py-2 border ${
                  formik.touched.fullName && formik.errors.fullName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.fullName}
              </p>
            )}
          </div>

          <div>
            {/* <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label> */}
            <div className="relative flex items-center h-12">
              <img
                src={Phone}
                alt="Phone Icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter phone number"
                className={`w-full pl-12 pr-4 py-2 border ${
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.phoneNumber}
              </p>
            )}
          </div>
        </div>

        <div className="relative w-48 h-48 flex flex-col items-center justify-center border-2 border-dashed border-prog-blue rounded-lg hover:bg-gray-100 transition duration-300">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <>
              <img
                src={AddImage}
                alt="Upload Icon"
                className="w-12 h-12 mb-2 grayscale"
              />
              <span className="text-sm font-medium text-gray-600">
                Upload your photo
              </span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          {formik.errors.image && formik.touched.image && (
            <p className="text-red-500 text-sm mt-2">{formik.errors.image}</p>
          )}
        </div>
      </form>

      <div className="mt-6">
        <button
          type="submit"
          onClick={formik.handleSubmit}
          className="w-full max-w-sm px-4 py-3 bg-[#252525] text-white font-medium rounded-lg  focus:outline-none focus:ring-0 focus:ring-offset-0"
        >
          Save
        </button>
      </div>

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

export default UpdateProfile;
