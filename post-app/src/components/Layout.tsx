import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { selectCurrentUserName } from "../features/users/usersSlice";
import { userLoggedOut } from "../features/auth/authSlice";

const Layout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUserName);

  const handleLogoutClicked = () => {
    dispatch(userLoggedOut());
  };

  return (
    <>
      <header className="header-nav">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/posts-list">Posts List</Link>
          <Link to="/add-post">Add Post</Link>
        </nav>
        <div>
          <span>
            <i>Welcome! </i> {user?.name}
          </span>
          <button className="logout-btn" onClick={handleLogoutClicked}>
            Logout
          </button>
        </div>
      </header>
      <main>
        {/* The child route element will render here */}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
