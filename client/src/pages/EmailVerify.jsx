import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import {
  FaEnvelope,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";

const EmailVerify = () => {
  const { backendUrl, isLoggedin, userData, getUserData } =
    useContext(AppContext);

  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const inputRefs = useRef([]);

  const handleOtpChange = (value, index) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const newOtp = otp.split("");
    newOtp[index] = digit;
    setOtp(newOtp.join(""));

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      return;
    }
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp },
        { withCredentials: true }
      );
        toast.success(data.message);
        await getUserData();
        navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (isLoggedin && userData?.isAccountVerified) {
      navigate("/");
    }
  }, [isLoggedin, userData, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br dark:bg-gray-950 mt-8">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md p-8 sm:p-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl"
      >
        <div className="flex justify-center mb-4 text-4xl text-purple-600">
          <FaShieldAlt />
        </div>

        <h1 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-semibold text-center">
          Verify Your Email
        </h1>

        <p className="text-center text-gray-500 dark:text-gray-400 mt-3">
          <FaEnvelope className="inline mr-2" />
          We've sent a 6-digit verification code to your email address.
        </p>

        {userData?.email && (
          <p className="text-center text-purple-600 dark:text-indigo-400 font-medium mt-2 break-all">
            {userData.email}
          </p>
        )}

        <div className="flex justify-center gap-2 sm:gap-3 mt-8 mb-7">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                required
                value={otp[index] || ""}
                onChange={(e) =>
                  handleOtpChange(e.target.value, index)
                }
                className="w-11 h-12 sm:w-12 sm:h-14 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-xl text-center font-semibold rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
              />
            ))}
        </div>

        <p className="text-center text-gray-500 dark:text-gray-400 text-xs mb-6">
          Enter the code.
        </p>

        <button className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg">
          <FaCheckCircle className="inline mr-2" />
          Verify email
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full mt-3 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full font-medium"
        >
          <FaArrowLeft className="inline mr-2" />
          Back
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;