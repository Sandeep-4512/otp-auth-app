import React from "react";
import { useNavigate } from "react-router-dom";

const ResendOTP = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>OTP Expired</h2>
      <p>Your OTP has expired. Request a new one.</p>
      <button onClick={() => navigate("/")}>Resend OTP</button>
    </div>
  );
};

export default ResendOTP;
