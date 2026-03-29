import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import { authRoutes } from "../features/auth/routes";
import { postRoutes } from "../features/posts/routes";
import { userRoutes } from "../features/users/routes";

import { Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/posts" replace /> },
      ...authRoutes,
      ...postRoutes,
      ...userRoutes,
    ],
  },
]);
