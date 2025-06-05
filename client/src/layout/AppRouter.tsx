import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./Applayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import TradeJournal from "@/pages/trade-journal/TradeJournal";
import RiskBasedPositionSize from "@/pages/risk-based-ps/RiskBasedPositionSize";
import { LoginForm } from "@/pages/authentication/Login";
import { SignUpForm } from "@/pages/authentication/SignUpForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/journal",
        element: <TradeJournal />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/position-size/risk-based",
        element: <RiskBasedPositionSize />,
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
]);

export default router;
