import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaUser,
  FaCamera,
  FaTrash,
  FaEdit,
  FaArrowLeft,
  FaEnvelope,
  FaCheckCircle,
  FaTimes,
  FaSave,
} from "react-icons/fa";

const Profile = () => {
  const { userData, backendUrl, getUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const handleEdit = () => {
    setName(userData?.name || "");
    setEmail(userData?.email || "");
    setBio(userData?.bio || "");
    setEditMode(true);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await axios.post(
        `${backendUrl}/api/auth/profile-image/${userData._id}`,
        formData,
        { withCredentials: true },
      );
      await getUserData();
      setShowMenu(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  const handleRemoveImage = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${backendUrl}/api/auth/profile-image/${userData._id}`,
        { action: "remove" },
        { withCredentials: true },
      );
      await getUserData();
      setShowMenu(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${backendUrl}/api/auth/update-profile/${userData._id}`,
        {
          name: name.trim(),
          email: email.trim(),
          bio: bio.trim(),
        },
        { withCredentials: true },
      );
      await getUserData();
      setEditMode(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10 mt-8 dark:bg-gray-950">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="relative h-24 bg-purple-800">
          <div className="absolute left-1/2 top-12 -translate-x-1/2">
            <div className="relative h-24 w-24 rounded-full bg-white p-1 shadow-lg dark:bg-gray-800">
              {userData?.profileImage ? (
                <img
                  src={userData.profileImage}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-purple-400 text-3xl font-bold text-white">
                  {userData?.name?.charAt(0)?.toUpperCase() || <FaUser />}
                </div>
              )}

              <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                disabled={loading}
                className="absolute bottom-0 right-0 rounded-full bg-white p-2 text-purple-700 shadow dark:bg-gray-800"
              >
                <FaCamera />
              </button>

              {showMenu && (
                <div className="absolute left-20 top-20 z-10 w-40 overflow-hidden rounded-xl border bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <label className="flex cursor-pointer items-center gap-2 p-3 text-sm hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                    <FaEdit />
                    {loading ? "Uploading..." : "Update Image"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={loading}
                      className="hidden"
                    />
                  </label>

                  {userData?.profileImage && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      disabled={loading}
                      className="flex w-full items-center gap-2 p-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700"
                    >
                      <FaTrash /> Remove Image
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-5 pb-6 pt-16 sm:px-7">
          {!editMode ? (
            <>
              <div className="text-center">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                  {userData?.name || "User"}
                </h1>

                <p className="mt-1 flex items-center justify-center gap-2 break-all text-sm text-gray-500 dark:text-gray-400">
                  <FaEnvelope />
                  {userData?.email || "No email"}
                </p>

                <span
                  className={`mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs ${
                    userData?.isAccountVerified
                      ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                  }`}
                >
                  <FaCheckCircle />
                  {userData?.isAccountVerified
                    ? "Email Verified"
                    : "Email Not Verified"}
                </span>
              </div>

              <div className="mt-5 text-center">
                <p className="text-xs font-semibold uppercase text-gray-400">
                  About
                </p>
                <p className="mt-1 break-words text-sm text-gray-600 dark:text-gray-300">
                  {userData?.bio || "No bio added yet."}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="min-w-0 rounded-xl bg-purple-50 p-3 dark:bg-purple-950/30">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Name
                  </p>
                  <p className="mt-1 truncate text-sm font-semibold text-gray-800 dark:text-white">
                    {userData?.name || "Not available"}
                  </p>
                </div>

                <div className="min-w-0 rounded-xl bg-purple-50 p-3 dark:bg-purple-950/30">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="mt-1 truncate text-sm font-semibold text-gray-800 dark:text-white">
                    {userData?.email || "Not available"}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border p-3 text-gray-700 dark:border-gray-700 dark:text-white"
                >
                  <FaArrowLeft /> Back
                </button>

                <button
                  type="button"
                  onClick={handleEdit}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-purple-700 p-3 font-semibold text-white"
                >
                  <FaEdit /> Edit Profile
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleUpdateProfile}>
              <h2 className="mb-5 text-center text-xl font-bold text-gray-800 dark:text-white">
                Edit Profile
              </h2>

              <div className="mb-3">
                <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-gray-900 outline-none focus:border-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div className="mb-3">
                <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-gray-900 outline-none focus:border-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  maxLength={150}
                  placeholder="Write something about yourself..."
                  className="w-full resize-none rounded-xl border border-gray-300 bg-white px-3 py-3 text-gray-900 outline-none focus:border-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                <p className="text-right text-xs text-gray-400">
                  {bio.length}/150
                </p>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  disabled={loading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border p-3 dark:border-gray-700 dark:text-white"
                >
                  <FaTimes /> Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-purple-600 p-3 text-white disabled:opacity-50"
                >
                  <FaSave /> {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
