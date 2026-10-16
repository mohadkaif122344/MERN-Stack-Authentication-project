import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaCheckCircle, FaShieldAlt, FaArrowLeft, FaPaperPlane } from "react-icons/fa";

const SendVerifyEmailOtp = () => {
  const navigate = useNavigate();
  const { userData, backendUrl } = useContext(AppContext);

  const sendVerificationOtp = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp",
        {},
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/email-verify");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-purple-50 via-white to-indigo-100 dark:from-gray-950 dark:to-gray-900 mt-8">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">

        <div className="relative h-24 bg-purple-700 ">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <div className="h-24 w-24 rounded-full bg-white p-1 shadow-lg dark:bg-gray-800">
              {userData?.profileImage ? (
                <img src={userData.profileImage} alt="Profile"
                  className="h-full w-full rounded-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-purple-100 text-3xl font-bold text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                  {userData?.name?.charAt(0)?.toUpperCase() || <FaUser />}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-5 pb-7 pt-14 sm:px-7">
          <h1 className="break-words text-center text-2xl font-bold text-gray-900 dark:text-white">
            {userData?.name || "Your Account"}
          </h1>

          <p className="mt-2 flex items-center justify-center gap-2 break-all text-sm text-gray-500 dark:text-gray-400">
            <FaEnvelope className="shrink-0" />
            {userData?.email || "No email available"}
          </p>

          <div className="mt-5 flex justify-center">
            <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
              userData?.isAccountVerified
                ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400"
            }`}>
              <FaCheckCircle />
              {userData?.isAccountVerified ? "Email Verified" : "Email Not Verified"}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-purple-100 bg-purple-50 p-4 dark:border-purple-900 dark:bg-purple-950/30">
            <div className="mb-2 flex justify-center text-2xl text-purple-600">
              <FaShieldAlt />
            </div>
            <p className="text-center text-sm leading-6 text-gray-600 dark:text-gray-300">
              {userData?.isAccountVerified
                ? "Your email address has been successfully verified."
                : "Verify your email address to keep your account secure."}
            </p>
          </div>

          {!userData?.isAccountVerified && (
            <button onClick={sendVerificationOtp}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3.5 font-semibold text-white shadow-md transition hover:bg-purple-700 active:scale-[0.99]">
              <FaPaperPlane /> Verify Email
            </button>
          )}

          <button onClick={() => navigate(-1)}
            className="mt-4 flex w-full items-center justify-center gap-2 text-sm text-gray-500 transition hover:text-purple-600 dark:text-gray-400">
            <FaArrowLeft /> Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendVerifyEmailOtp;
