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
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(newOTP);
    console.log(`OTP sent to your email: ${newOTP}`);
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
      const msg = new SpeechSynthesisUtterance(`Your OTP is ${otp.split("").join(" ")}`);
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
