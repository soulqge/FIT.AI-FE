"use client";

import { useAuthToken } from "@/hooks/use-auth";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useAuthToken();

  if (token === null) {
    return redirect("/signin");
  }

  return <>{children}</>;
}
