import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./RootLayout";
import { authRoutes } from "../features/auth/routes";
import { postRoutes } from "../features/posts/routes";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [...authRoutes, ...postRoutes],
  },
]);
