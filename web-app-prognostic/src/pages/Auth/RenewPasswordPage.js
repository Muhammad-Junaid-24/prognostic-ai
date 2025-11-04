import React, { useEffect, useState } from "react";
// import EmailIcon from '../../assets/icons/message.svg';
import PasswordIcon from "../../assets/icons/lock.svg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPasswordWithTokenApiCall } from "../../services/authApiService";

function RenewPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    // Extracting email and token from query string
    const queryParams = new URLSearchParams(location.search);
    setEmail(queryParams.get("email") || "");
    setToken(queryParams.get("token") || "");
  }, [location.search]);

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const response = await resetPasswordWithTokenApiCall(
      email,
      token,
      password
    );
    if (response?.success) {
      setError("");
      navigate("/forget-password/success");
    } else {
      setError(response?.error?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="flex flex-col px-10 w-full h-full mt-16 lg:mt-32 ">
      <div className="w-full max-w-[375px] flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold">New Password?</h1>
        <div className="my-[60px]">
          <svg
            width="135"
            height="134"
            viewBox="0 0 135 134"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle opacity="0.2" cx="67.5" cy="67" r="67" fill="#252525" />
            <circle cx="67.5006" cy="66.9999" r="44.6667" fill="#252525" />
            <g clip-path="url(#clip0_128_585)">
              <path
                d="M78.1663 62.0001V56.2934C78.2236 53.4026 77.1334 50.6068 75.1344 48.5178C73.1354 46.4288 70.3902 45.2167 67.4997 45.1467C64.6091 45.2167 61.864 46.4288 59.865 48.5178C57.8659 50.6068 56.7757 53.4026 56.833 56.2934V62.0001H52.833V84.6667C52.833 85.374 53.114 86.0523 53.6141 86.5523C54.1142 87.0524 54.7924 87.3334 55.4997 87.3334H79.4997C80.2069 87.3334 80.8852 87.0524 81.3853 86.5523C81.8854 86.0523 82.1663 85.374 82.1663 84.6667V62.0001H78.1663ZM68.833 75.6401V79.3334H66.1663V75.5201C65.5172 75.1861 65.0018 74.6401 64.7056 73.9729C64.4094 73.3056 64.3503 72.5572 64.538 71.8517C64.7258 71.1462 65.1491 70.5261 65.7377 70.0944C66.3264 69.6626 67.045 69.445 67.7743 69.4779C68.5036 69.5107 69.1997 69.7919 69.7472 70.2748C70.2947 70.7577 70.6606 71.4133 70.7842 72.1328C70.9078 72.8523 70.7817 73.5924 70.4268 74.2303C70.0719 74.8683 69.5095 75.3657 68.833 75.6401ZM75.4997 62.0001H59.4997V56.2934C59.4422 54.1097 60.2514 51.992 61.7504 50.4031C63.2494 48.8141 65.3163 47.8831 67.4997 47.8134C69.683 47.8831 71.75 48.8141 73.249 50.4031C74.748 51.992 75.5572 54.1097 75.4997 56.2934V62.0001Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_128_585">
                <rect
                  width="49.6296"
                  height="49.6296"
                  fill="white"
                  transform="translate(42.6855 42.1851)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      <div className="flex flex-col w-full max-w-[375px]">
        <h2 className="text-lg font-bold text-center mb-6">
          Set a New Password
        </h2>
        <div className="gap-4 flex flex-col">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex gap-2 items-center px-4 py-2 rounded-md border border-[#d9d9d9]-lighter">
            <img src={PasswordIcon} alt="password" className="h-6 w-6" />
            <input
              type={showPassword ? "text" : "password"}
              className="h-full w-full p-2 placeholder:text-prog-gray border-none outline-none"
              placeholder="New Password (min 8 characters)"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="h-6 w-6"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <div className="flex gap-2 items-center px-4 py-2 rounded-md border border-[#d9d9d9]-lighter">
            <img
              src={PasswordIcon}
              alt="confirm password"
              className="h-6 w-6"
            />
            <input
              type={showPasswordConfirm ? "text" : "password"}
              className="h-full w-full p-2 placeholder:text-prog-gray outline-none border-none"
              placeholder="Confirm New Password"
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="h-6 w-6"
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            >
              {showPasswordConfirm ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col">
          <button
            onClick={handlePasswordReset}
            className="bg-prog-blue text-center w-full text-white py-4 rounded-md"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default RenewPasswordPage;
