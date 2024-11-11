"use server";

import { db } from "@/lib/db";

export const updateDonation = async (id: string) => {
  try {
    const donation = await db.donation.update({
      where: { id },
      data: { isCompleted: true },
    });
    if (donation) {
      return { success: true };
    } else {
      return { error: "Not succeed" };
    }
  } catch (error) {
    return { error: "Not succeed" };
  }
};
