import Sidebar from "@/components/dashboard/Sidebar";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div className="flex gap-3">
      <Sidebar />
      <div className="w-full p-3">{children}</div>
    </div>
  );
};

export default DashboardLayout;
