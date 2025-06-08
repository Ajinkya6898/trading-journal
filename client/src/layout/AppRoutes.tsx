import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import AddEntry from "../pages/add-entry/AddEntry";
import RiskBasedPositionSize from "../pages/ps-calculator/RiskBasedPositionSize";
import LoginForm from "../pages/auth/LoginForm";
import SignUpForm from "../pages/auth/SignUpForm";
import ForgotPasswordForm from "../pages/auth/ForgotPasswordForm";
import VerifyEmailOtpForm from "../pages/auth/VerifyEmailOtpForm";
import ResetPasswordForm from "../pages/auth/ResetPasswordForm";
import EqualMoneyPositionSize from "../pages/ps-calculator/EqualMoneyPositionSize";
import TradingJournalTable from "../pages/journal/TradingJournalTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/journal",
        element: <TradingJournalTable />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/position-size/risk-based",
        element: <RiskBasedPositionSize />,
      },
      {
        path: "/position-size/equal-money",
        element: <EqualMoneyPositionSize />,
      },
      {
        path: "/add-entry",
        element: <AddEntry />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/signup",
    element: <SignUpForm />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordForm />,
  },
  {
    path: "/forgot-password/verify-otp",
    element: <VerifyEmailOtpForm />,
  },
  {
    path: "/forgot-password/reset-password",
    element: <ResetPasswordForm />,
  },
]);

export default router;
