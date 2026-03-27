import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import PostsList from "./features/posts/PostsList";
import AddPost from "./features/posts/AddPost";
import SinglePost from "./features/posts/SinglePost";
import EditPost from "./features/posts/EditPost";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
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
  ]);
  return <RouterProvider router={router} />;
}

export default App;
