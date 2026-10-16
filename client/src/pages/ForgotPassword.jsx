import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaLock,
  FaKey,
  FaArrowLeft,
  FaPaperPlane,
} from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmit, setIsOtpSubmit] = useState(false);

  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-forgot-otp`,
        { email },
        { withCredentials: true }
      );
      toast.success(data.message);
      setIsEmailSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      return;
    }
    setIsOtpSubmit(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/forgot-password`,
        { email, otp, newPassword },
        { withCredentials: true }
      );
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-gradient-to-br dark:from-gray-950 dark:to-gray-900">

      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="w-full max-w-md p-7 sm:p-9 rounded-3xl bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl"
        >
          <h1 className="text-gray-900 dark:text-white text-2xl font-bold text-center">
            <FaLock className="inline mr-2" /> Forgot Password
          </h1>

          <p className="text-center mt-3 mb-7 text-gray-500 dark:text-gray-400 text-sm">
            Enter your registered email address
          </p>

          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <FaEnvelope className="text-gray-500 dark:text-gray-400" />

            <input
              type="email"
              placeholder="Email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <button className="w-full py-3 mt-7 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-semibold">
            <FaPaperPlane className="inline mr-2" /> Submit
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full mt-3 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FaArrowLeft className="inline mr-2" /> Back
          </button>
        </form>
      )}

      {isEmailSent && !isOtpSubmit && (
        <form
          onSubmit={onSubmitOTP}
          className="w-full max-w-md p-7 sm:p-9 rounded-3xl bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl"
        >
          <h1 className="text-gray-900 dark:text-white text-2xl font-bold text-center">
            <FaKey className="inline mr-2" /> Forgot Password OTP
          </h1>

          <p className="text-center text-gray-500 dark:text-gray-400 mt-3 text-sm">
            Enter the 6-digit verification code sent to your email.
          </p>

          <p className="text-center text-purple-600 dark:text-purple-400 font-semibold mt-2 break-all">
            <FaEnvelope className="inline mr-2 text-black dark:text-gray-300" />{" "}
            {email}
          </p>

          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, ""))
            }
            placeholder="Enter 6-digit OTP"
            required
            className="w-full mt-8 mb-7 py-3 px-5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-center text-xl font-semibold rounded-xl outline-none focus:border-blue-500"
          />

          <button className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-semibold">
            <FaKey className="inline mr-2" /> Submit
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full mt-3 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FaArrowLeft className="inline mr-2" /> Back
          </button>
        </form>
      )}

      {isOtpSubmit && isEmailSent && (
        <form
          onSubmit={onSubmitNewPassword}
          className="w-full max-w-md p-7 sm:p-9 rounded-3xl bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl"
        >
          <h1 className="text-gray-900 dark:text-white text-2xl font-bold text-center">
            <FaLock className="inline mr-2 text-purple-600 dark:text-purple-400" />{" "}
            New Password
          </h1>

          <p className="text-center mt-3 mb-7 text-gray-500 dark:text-gray-400 text-sm">
            Enter your new password below
          </p>

          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <FaLock className="text-gray-500 dark:text-gray-400" />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <button className="w-full py-3 mt-7 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-semibold">
            <FaPaperPlane className="inline mr-2" /> Submit
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full mt-3 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FaArrowLeft className="inline mr-2" /> Back
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;