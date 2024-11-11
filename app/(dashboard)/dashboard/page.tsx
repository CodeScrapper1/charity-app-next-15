import Analytics from "@/components/dashboard/Analytics";
import { db } from "@/lib/db";
import React from "react";

const Dashboard = async () => {
  const [
    newsCount,
    userCount,
    topDonators,
    todayDonation,
    weeklyDonationList,
    totalDonations,
  ] = await db.$transaction([
    db.news.count(),
    db.user.count(),
    db.donation.groupBy({
      by: ["userId"],
      _sum: { price: true },
      orderBy: { _sum: { price: "desc" } },
      take: 5,
    }),

    // today donation
    db.donation.count({
      where: {
        createAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 1)),
        },
      },
    }),

    // weekly donations
    db.donation.findMany({
      where: {
        createAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
      include: { user: true },
      orderBy: { createAt: "desc" },
    }),
    db.donation.aggregate({
      _sum: {
        price: true,
      },
    }),
  ]);

  const enrichedDonators = await Promise.all(
    topDonators.map(async (donator) => {
      const user = await db.user.findUnique({ where: { id: donator.userId } });
      return { ...donator, user };
    })
  );

  return (
    <Analytics
      donationCount={todayDonation}
      newsCount={newsCount}
      userCount={userCount}
      enrichedTopDonators={enrichedDonators}
      weeklyDonationList={weeklyDonationList}
      totalDonaton={totalDonations?._sum?.price || 0}
    />
  );
};

export default Dashboard;
