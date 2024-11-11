import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session: any = await getAuthSession();
  if (session?.user) {
    redirect("/");
  }

  return <div>{children}</div>;
};

export default AuthLayout;
