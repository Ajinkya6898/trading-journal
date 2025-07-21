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
import TradingJournalTable from "../pages/stocks-journal/StocksTradingJournalTable";
import FiiDiiDashboard from "../pages/fiidii-activity/FiiDiiDashboard";
import ProfileProgress from "../pages/user-profile/ProfileProgress";
import FundTransaction from "../pages/fund-transactions/FundTransaction";
import TargetPriceCalculator from "../pages/target/TargetPriceCalculator";
import { MutualFundJournal } from "../pages/mutual-fund-journal/MutualFundJournal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/stocks-journal",
        element: <TradingJournalTable />,
      },
      {
        path: "/mutual-funds-journal",
        element: <MutualFundJournal />,
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
      {
        path: "/activity",
        element: <FiiDiiDashboard />,
      },
      {
        path: "/complete-profile",
        element: <ProfileProgress />,
      },
      {
        path: "/fund-transactions",
        element: <FundTransaction />,
      },
      {
        path: "/target",
        element: <TargetPriceCalculator />,
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
