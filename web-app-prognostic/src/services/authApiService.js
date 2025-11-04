
import  configs  from '../config';

const API_BASE_URL = configs.apiUrl;


const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    console.error('API Error:', error); 
    return { error }; 
  }
  return response.json();
};

// Login function
export const LoginApiCall = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/userAuth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Login error:', error);
    return { error }; 
  }
};

// Sign-up function
export const SignupApiCall = async (name,email, password,confirmPassword, phoneNumber) => {
  try {
    const response = await fetch(`${API_BASE_URL}/userAuth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name,email, password, confirmPassword, phoneNumber}),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Signup error:', error);
    return { error };
  }
};

// Forgot password function
export const forgotPasswordWithEmailApiCall = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/userAuth/forgotPassword `, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Forgot Password error:', error);
    return { error };
  }
};

export const resetPasswordWithTokenApiCall = async (email, token, newPassword) => {
    try {
      const response = await fetch(`${API_BASE_URL}/userAuth/resetPassword  `, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, newPassword }),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Forgot Password error:', error);
      return { error };
    }
  };

// OTP verification function
export const verifyOtpApiCall = async (id, otp) => {
  try {
    const response = await fetch(`${API_BASE_URL}/userAuth/verifyOtp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, otp }), 
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('OTP Verification error:', error);
    return { error };
  }
};
