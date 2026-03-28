import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav>Nav</nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
