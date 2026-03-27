import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/posts-list">Posts List</Link>
          <Link to="/add-post">Add Post</Link>
        </nav>
      </header>
      <main>
        {/* The child route element will render here */}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
