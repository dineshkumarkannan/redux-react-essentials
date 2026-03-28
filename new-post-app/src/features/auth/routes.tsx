import { lazy } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const LoginPage = lazy(() => import("./LoginPage"));

export const authRoutes = [
  {
    path: "/auth",
    element: <LoginPage />,
  },
];
