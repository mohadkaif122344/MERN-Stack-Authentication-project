import { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const EmailVerify = () => {
  const { backendUrl, isLoggedin, userData, getUserData } =
    useContext(AppContext);

  const navigate = useNavigate();
  const inputRefs = useRef([]);

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

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const otp = inputRefs.current.map((e) => e.value).join("");
      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isLoggedin && userData?.isAccountVerified) navigate("/");
  }, [isLoggedin, userData]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br dark:bg-gray-950">
      <Link to="/" className="absolute left-5 sm:left-20 top-5 flex gap-2">
  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
    <img src={assets.logo} className="w-7 h-7 brightness-0 invert" />
  </div>
  <div className="hidden sm:block">
    <b className="text-lg text-blue-600">MyApp</b>
    <p className="text-[10px] text-gray-400">Simple & Secure</p>
  </div>
</Link>

      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md p-8 sm:p-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl"
      >
        <h1 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-semibold text-center">
          Verify Your Email
        </h1>

        <p className="text-center text-gray-500 dark:text-gray-400 mt-3">
          We've sent a 6-digit verification code to your email address.
        </p>

        {userData?.email && (
          <p className="text-center text-indigo-600 dark:text-indigo-400 font-medium mt-2 break-all">
            {userData.email}
          </p>
        )}

        <div
          onPaste={handlePaste}
          className="flex justify-center gap-2 sm:gap-3 mt-8 mb-7"
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
                className="w-11 h-12 sm:w-12 sm:h-14 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-xl text-center font-semibold rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
              />
            ))}
        </div>

        <p className="text-center text-gray-500 dark:text-gray-400 text-xs mb-6">
          Enter the code.
        </p>

        <button className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full shadow-lg">
          Verify email
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full mt-3 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full font-medium"
        >
          ← Back
        </button>

        <p className="text-center text-gray-500 dark:text-gray-400 text-xs mt-6">
          This verification code will expire soon.
        </p>
      </form>
    </div>
  );
};

export default EmailVerify;