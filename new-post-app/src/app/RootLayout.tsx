import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AppProviders from "./Providers";

export default function RootLayout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppProviders>
        <Outlet />
      </AppProviders>
    </Suspense>
  );
}
