import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";

import "./App.css";
// import { useAppDispatch } from "./app/hooks";
// import { useEffect } from "react";
// import { refreshAccessToken } from "./features/auth/authThunks";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
