import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteAccount from "./pages/DeleteAccount";
import SendVerifyEmailOtp from "./pages/SendVerifyEmailOtp";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Footer from "./pages/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";

const App = () => {
  const { isLoggedin } = useContext(AppContext);
  return (
    <div>
      <ToastContainer />

      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />

        <Route
          path="/email-verify"
          element={
            <ProtectedRoute>
              <EmailVerify />
            </ProtectedRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings/email-verification"
          element={
            <ProtectedRoute>
              <SendVerifyEmailOtp />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings/delete-account"
          element={
            <ProtectedRoute>
              <DeleteAccount />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings/security/change-password"
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
      </Routes>

      {isLoggedin && <Footer />}
    </div>
  );
};

export default App;
