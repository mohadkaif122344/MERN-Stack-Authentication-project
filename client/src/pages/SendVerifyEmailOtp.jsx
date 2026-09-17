import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const SendVerifyEmailOtp = () => {
  const navigate = useNavigate();
  const { userData, backendUrl } = useContext(AppContext);

  const sendVerificationOtp = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp",
        {},
        { withCredentials: true },
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/email-verify");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-br dark:bg-gray-950">
  <Link to="/" className="absolute left-5 sm:left-20 top-5 flex gap-2">
  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
    <img src={assets.logo} className="w-7 h-7 brightness-0 invert" />
  </div>
  <div className="hidden sm:block">
    <b className="text-lg text-blue-600">MyApp</b>
    <p className="text-[10px] text-gray-400">Simple & Secure</p>
  </div>
</Link>
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="h-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 relative">
          <div className="absolute left-1/2 -bottom-12 -translate-x-1/2">
            <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 p-1 shadow-xl">
              {userData?.profileImage  ? (
                <img
                  src={userData.profileImage }
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                  {userData?.name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-14 px-6 pb-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            {userData?.name || "User"}
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1 break-all">
            {userData?.email || "No email available"}
          </p>

          <div className="flex justify-center mt-4">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                userData?.isAccountVerified
                  ? "bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400"
                  : "bg-yellow-100 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-400"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  userData?.isAccountVerified ? "bg-green-500" : "bg-yellow-500"
                }`}
              />
              {userData?.isAccountVerified
                ? "Email Verified"
                : "Email Not Verified"}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900">
            <p className="text-sm text-center text-gray-600 dark:text-gray-300">
              {userData?.isAccountVerified
                ? "Your email address has been successfully verified."
                : "Your email is not verified yet. Verify your email to secure your account."}
            </p>
          </div>

          {!userData?.isAccountVerified && (
            <button
              onClick={sendVerificationOtp}
              className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg transition"
            >
              Verify Email
            </button>
          )}

          <button
            onClick={() => navigate("/profile")}
            className="w-full mt-3 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            View Profile
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full mt-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendVerifyEmailOtp;
