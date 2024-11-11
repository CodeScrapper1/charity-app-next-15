"use server";

import { getAuthSession } from "./auth";
import { db } from "./db";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const paymentMethod = async (price: number) => {
  const sessionDetails: any = await getAuthSession();

  if (!sessionDetails?.user) {
    return { error: "Please login first" };
  }

  try {
    const donation = await db.donation.create({
      data: { price, userId: sessionDetails?.user?.id },
    });

    const transformedDonation = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "donation",
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: transformedDonation,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/success/${donation.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/cancel`,
    });

    if (session) return session.url;
  } catch (error) {}
};
