import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import PostsList from "./features/posts/PostsList";
import AddPost from "./features/posts/AddPost";
import SinglePost from "./features/posts/SinglePost";
import EditPost from "./features/posts/EditPost";
import { useAppSelector } from "./app/hook";
import { selectCurrentUser } from "./features/auth/authSlice";
import LoginPage from "./features/auth/LoginPage";

const ProtectedRoute = () => {
  const username = useAppSelector(selectCurrentUser);
  console.log(username);
  if (!username) {
    return <Navigate to={"auth"} replace />;
  }

  return <Outlet />;
};

function App() {
  const router = createBrowserRouter([
    {
      path: "auth",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/",
              element: <div>Dashboard</div>,
            },
            {
              path: "posts-list",
              element: <PostsList />,
            },
            {
              path: "posts-list/:postId",
              element: <SinglePost />,
            },
            {
              path: "edit-post/:postId",
              element: <EditPost />,
            },
            {
              path: "add-post",
              element: <AddPost />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
