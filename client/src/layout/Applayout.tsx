import { NavLink, Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-16 bg-gray-100 border-b flex items-center px-6 shadow-sm">
        <h1 className="text-xl font-semibold"></h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-gray-50 border-r p-4 overflow-y-auto">
          <nav>
            <ul className="space-y-2">
              <li className="text-gray-700 font-medium">
                <NavLink
                  to={"/dashboard"}
                  className="text-gray-700 font-medium"
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="text-gray-700 font-medium">
                <NavLink to={"/journal"} className="text-gray-700 font-medium">
                  Journal
                </NavLink>
              </li>
              <li className="text-gray-700 font-medium">Trades</li>
              <li className="text-gray-700 font-medium">Settings</li>
            </ul>
          </nav>
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
