import { lazy } from "react";
import { requireAuth } from "../../app/loaders/requireAuth";
import Layout from "../../layouts/Layout";

// eslint-disable-next-line react-refresh/only-export-components
const PostsPage = lazy(() => import("./PostsPage"));

export const postRoutes = [
  {
    path: "/",
    loader: requireAuth, // 🔥 Auth guard here
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PostsPage />,
      },
    ],
  },
];
