import { lazy } from "react";
import { requireAuth } from "../../app/loaders/requireAuth";
import Layout from "../../layouts/Layout";

const PostsPage = lazy(() => import("./PostsPage"));
const PostAddPage = lazy(() => import("./PostAddPage"));
const PostEditPage = lazy(() => import("./PostEditPage"));

export const postRoutes = [
  {
    path: "/posts",
    loader: requireAuth,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PostsPage />,
      },
      {
        path: "add",
        element: <PostAddPage />,
      },
      {
        path: "edit/:id",
        element: <PostEditPage />,
      },
    ],
  },
];
