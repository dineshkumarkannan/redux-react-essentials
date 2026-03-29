import { lazy } from "react";

const UsersPage = lazy(() => import("./UsersPage"));

export const userRoutes = [
  {
    path: "/users",
    element: <UsersPage />,
  },
];
