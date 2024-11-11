import AdminVolunteers from "@/components/dashboard/AdminVolunteers";
import { db } from "@/lib/db";
import React from "react";

const VolunteersPage = async () => {
  const volunteers = await db.user.findMany({ where: { role: "user" } });

  return <AdminVolunteers volunteers={volunteers} />;
};

export default VolunteersPage;
