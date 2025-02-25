import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../AuthContext";

const Login = () => {
  const [otp, setOtp] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const generateOTP = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = String(now.getFullYear());
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
  
    const formattedOTP = `${day}${month}${year}${hours}${minutes}`;
    setOtp(formattedOTP);
    console.log(`Your OTP (DDMMYYYYHHMM format): ${formattedOTP}`);
    setTimer(30);
    setCanResend(false);
  };
  

  useEffect(() => {
    generateOTP();

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) setCanResend(true);
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleVerify = () => {
    if (userInput === otp && timer > 0) {
      login();
    } else {
      navigate("/resend-otp");
    }
  };

  // ✅ Function to read OTP aloud
  const readOTP = () => {
    if (otp) {
      const spacedOTP = otp.split("").join(" "); // Adds space between numbers
      const msg = new SpeechSynthesisUtterance(`Your OTP is ${spacedOTP}`);
      window.speechSynthesis.speak(msg);
    }
  };
  

  return (
    <div className="container">
      <h2>Enter OTP</h2>
      <input
        type={showOtp ? "text" : "password"}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter OTP"
      />
      <button className="show-otp-btn" onClick={() => setShowOtp(!showOtp)}>
        {showOtp ? "Hide OTP" : "Show OTP"}
      </button>
      <button onClick={handleVerify} disabled={timer === 0}>
        Verify OTP
      </button>
      <p className="timer">OTP expires in: {timer} seconds</p>

      {canResend && (
        <button className="resend-btn" onClick={generateOTP}>
          Resend OTP
        </button>
      )}

      {/* ✅ Read OTP Button */}
      <button className="audio-btn" onClick={readOTP}>🔊 Read OTP</button>
    </div>
  );
};

export default Login;
