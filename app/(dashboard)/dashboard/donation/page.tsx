import Donationtable from "@/components/dashboard/Donationtable";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Donation } from "@prisma/client";
import React from "react";

const DonationAdminPage = async () => {
  const session: any = await getAuthSession();

  let donations: Donation[];

  if (session?.user?.role == "admin") {
    donations = await db.donation.findMany({ include: { user: true } });
  } else {
    donations = await db.donation.findMany({
      where: { userId: session?.user?.id },
      include: { user: true },
    });
  }
  return <Donationtable donations={donations} />;
};

export default DonationAdminPage;
