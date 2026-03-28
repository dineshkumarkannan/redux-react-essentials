import { Provider } from "react-redux";
import { store } from "./store";
import type React from "react";

interface AppProvidersProp {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProp) {
  return <Provider store={store}>{children}</Provider>;
}
