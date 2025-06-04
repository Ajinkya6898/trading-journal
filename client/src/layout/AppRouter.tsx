import { TradingJournalTable } from "@/pages/TradeJournal";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./Applayout";
import Dashboard from "@/pages/Dashboard";

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
    ],
  },
]);

export default router;
