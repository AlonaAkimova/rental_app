"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
interface AppProviderProps {
  children: ReactNode;
}
export default function AppProvider({ children }: AppProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
