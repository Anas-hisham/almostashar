"use client";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import AuthBootstrap from "@/features/auth/AuthBootstrap";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AuthBootstrap />
      {children}
    </Provider>
  );
}
