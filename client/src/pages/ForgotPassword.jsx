import { useState, useRef, useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmit, setIsOtpSubmit] = useState(false);

  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  axios.defaults.withCredentials = true;

  const handleInput = (e, i) => {
    if (e.target.value && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !e.target.value && i > 0)
      inputRefs.current[i - 1]?.focus();
  };

  const handlePaste = (e) => {
    e.clipboardData
      .getData("text")
      .split("")
      .forEach((char, i) => {
        if (inputRefs.current[i]) inputRefs.current[i].value = char;
      });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-forgot-otp",
        { email },
      );

      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();

    setOtp(inputRefs.current.map((e) => e?.value || "").join(""));

    setIsOtpSubmit(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/forgot-password",
        { email, otp, newPassword },
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-gradient-to-br">
      <Link to="/" className="absolute left-5 sm:left-20 top-5 flex gap-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
          <img src={assets.logo} className="w-7 h-7 brightness-0 invert" />
        </div>
        <div className="hidden sm:block">
          <b className="text-lg text-blue-600">MyApp</b>
          <p className="text-[10px] text-gray-400">Simple & Secure</p>
        </div>
      </Link>
      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="w-full max-w-md p-7 sm:p-9 rounded-3xl bg-white/90 border border-gray-200 shadow-2xl"
        >
          <h1 className="text-gray-900 text-2xl font-bold text-center">
            Reset Password
          </h1>
          <p className="text-center mt-3 mb-7 text-gray-500 text-sm">
            Enter your registered email address
          </p>
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gray-100 border border-gray-200">
            <img src={assets.mail_icon} className="w-4 h-4 opacity-70" />
            <input
              type="email"
              placeholder="Email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
            />
          </div>
          <button className="w-full py-3 mt-7 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full mt-3 py-3 rounded-2xl border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            ← Back
          </button>
        </form>
      )}
      {!isOtpSubmit && isEmailSent && (
        <form
          onSubmit={onSubmitOTP}
          className="w-full max-w-md p-7 sm:p-9 rounded-3xl bg-white/90 border border-gray-200 shadow-2xl"
        >
          <h1 className="text-gray-900 text-2xl font-bold text-center">
            Forgot Password OTP
          </h1>
          <p className="text-center text-gray-500 mt-3 text-sm">
            Sent a 6-digit verification code to your email id.
          </p>
          <p className="text-center text-blue-600 font-semibold mt-2 break-all">
            {email}
          </p>
          <div
            onPaste={handlePaste}
            className="flex justify-center gap-2 mt-8 mb-7"
          >
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  required
                  ref={(e) => (inputRefs.current[i] = e)}
                  onInput={(e) => handleInput(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-10 h-12 sm:w-12 sm:h-14 bg-gray-100 border border-gray-200 text-gray-900 text-xl text-center font-semibold rounded-xl outline-none focus:border-blue-500"
                />
              ))}
          </div>
          <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full mt-3 py-3 rounded-2xl border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            ← Back
          </button>
        </form>
      )}
      {isOtpSubmit && isEmailSent && (
        <form
          onSubmit={onSubmitNewPassword}
          className="w-full max-w-md p-7 sm:p-9 rounded-3xl bg-white/90 border border-gray-200 shadow-2xl"
        >
          <h1 className="text-gray-900 text-2xl font-bold text-center">
            New Password
          </h1>
          <p className="text-center mt-3 mb-7 text-gray-500 text-sm">
            Enter the new password below
          </p>
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gray-100 border border-gray-200">
            <img src={assets.lock_icon} className="w-4 h-4 opacity-70" />
            <input
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
            />
          </div>
          <button className="w-full py-3 mt-7 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full mt-3 py-3 rounded-2xl border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            ← Back
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;

