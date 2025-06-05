import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import AppHeader from "./AppHeader";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />

      <div className="flex flex-1 overflow-hidden">
        <aside className="">
          <Sidebar />
        </aside>

        <main className="flex-1 px-8 py-4 max-w-9xl space-y-8 overflow-y-auto bg-white">
          <Outlet />
        </main>
      </div>

      <footer className="h-12 bg-gray-100 border-t flex items-center justify-center text-sm text-gray-600">
        © 2025 Your App Name
      </footer>
    </div>
  );
};

export default AppLayout;
