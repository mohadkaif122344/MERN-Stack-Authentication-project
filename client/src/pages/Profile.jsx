import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Profile = () => {
  const { userData, backendUrl, getUserData } = useContext(AppContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name:"",
    email:"",
    bio:"",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleEdit = () => {
    setForm({
      name: userData?.name || "",
      email: userData?.email || "",
      bio: userData?.bio || "",
    });
    setEditMode(true);
  };

  // Upload Image
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/"))
      return toast.error("Please select an image");

    if (file.size > 5 * 1024 * 1024)
      return toast.error("Image size should be less than 5MB");

    try {
      setLoading(true);

      const data = new FormData();
      data.append("profileImage", file);

      const { data: res } = await axios.put(
        `${backendUrl}/api/put/profile/image`,
        data,
        { withCredentials: true }
      );

      if (res.success) {
        toast.success(res.message);
        await getUserData();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  // Remove Image
  const handleRemoveImage = async () => {
    try {
      setLoading(true);

      const { data } = await axios.delete(
        `${backendUrl}/api/put/profile/image`,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        setShowMenu(false);
        await getUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update Profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!form.name.trim())
      return toast.error("Name is required");

    if (!form.email.trim())
      return toast.error("Email is required");

    try {
      setLoading(true);

      if (form.name !== userData.name) {
        const { data } = await axios.put(
          backendUrl + "/api/put/update-name",
          { name: form.name },
          { withCredentials: true }
        );

        if (!data.success) return toast.error(data.message);
      }

      if (form.email !== userData.email) {
        const { data } = await axios.put(
          backendUrl + "/api/put/update-email",
          { email: form.email },
          { withCredentials: true }
        );

        if (!data.success) return toast.error(data.message);
      }

      if (form.bio !== userData.bio) {
        const { data } = await axios.put(
          backendUrl + "/api/put/update-bio",
          { bio: form.bio },
          { withCredentials: true }
        );

        if (!data.success) return toast.error(data.message);
      }

      toast.success("Profile updated successfully");
      await getUserData();
      setEditMode(false);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-14 bg-gradient-to-br dark:bg-gray-950">
      <Link
        to="/"
        className="absolute left-5 sm:left-20 top-5 flex gap-2"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
          <img
            src={assets.logo}
            className="w-7 h-7 brightness-0 invert"
          />
        </div>
        <div className="hidden sm:block">
          <b className="text-lg text-blue-600 dark:text-purple-400">
            MyApp
          </b>
          <p className="text-[10px] text-gray-400 dark:text-gray-500">
            Simple & Secure
          </p>
        </div>
      </Link>
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
        <div className="h-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 relative">
          <div className="absolute left-1/2 -bottom-12 -translate-x-1/2">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 p-1 shadow-lg">
                {userData?.profileImage ? (
                  <img
                    src={userData.profileImage}
                    className="w-full h-full rounded-full object-cover"
                    alt="Profile"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                    {userData?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                disabled={loading}
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white dark:bg-gray-800 shadow-md hover:scale-110 transition"
              >
                ✏️
              </button>

              {showMenu && (
                <div className="absolute top-28 right-0 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                  <button
                    type="button"
                    onClick={() => {
                      fileInputRef.current?.click();
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700"
                  >
                    Update Image
                  </button>
                  {userData?.profileImage && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      disabled={loading}
                      className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 disabled:opacity-50"
                    >
                      Remove Image
                    </button>
                  )}

                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
        <div className="pt-14 px-5 pb-5">

          {!editMode ? (
            <>
              <div className="text-center">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                  {userData?.name || "User"}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {userData?.email || "No email"}
                </p>
                <div className="mt-3">
                  {userData?.isAccountVerified ? (
                    <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 text-xs font-semibold">
                      Email Verified
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-400 text-xs font-semibold">
                      Email Not Verified
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-5 text-center">
                <p className="text-xs font-semibold text-gray-400 uppercase">
                  About
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {userData?.bio || "No bio added yet."}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Name
                  </p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white mt-1 truncate">
                    {userData?.name || "Not available"}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white mt-1 truncate">
                    {userData?.email || "Not available"}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleEdit}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
                >
                  ✏️ Edit Profile
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleUpdateProfile}>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-5">
                Edit Profile
              </h2>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full mb-3 px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full mb-3 px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none"
              />
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows="3"
                maxLength="100"
                placeholder="Write something about yourself..."
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none resize-none"
              />
              <p className="text-right text-xs text-gray-400 mt-1">
                {form.bio.length}/150
              </p>
              <div className="flex gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Save Changes"}
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