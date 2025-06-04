import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./Applayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import TradeJournal from "@/pages/trade-journal/TradeJournal";

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
    ],
  },
]);

export default router;
