import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-white shadow mb-4">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-bold text-blue-600">New Post App</div>
          <div className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded hover:bg-blue-100 transition ${isActive ? "bg-blue-200 text-blue-800" : "text-gray-700"}`
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                `px-3 py-2 rounded hover:bg-blue-100 transition ${isActive ? "bg-blue-200 text-blue-800" : "text-gray-700"}`
              }
            >
              Posts
            </NavLink>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `px-3 py-2 rounded hover:bg-blue-100 transition ${isActive ? "bg-blue-200 text-blue-800" : "text-gray-700"}`
              }
            >
              Users
            </NavLink>
          </div>
        </div>
      </nav>
      <main className="flex-1 container mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
