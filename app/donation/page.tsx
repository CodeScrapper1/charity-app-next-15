"use client";
import { paymentMethod } from "@/lib/paymentMethod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const array = [
  {
    name: "one time",
    prices: [100, 150, 200, 300, 450, 500],
  },
  {
    name: "monthly",
    prices: [10, 15, 20, 30, 45, 50],
  },
];

const DonationPage = () => {
  const router = useRouter();
  const [priceType, setPriceType] = useState(array[0]);
  const [selectAmount, setSelectAmount] = useState(0);

  const handlePayment = async () => {
    const response = await paymentMethod(selectAmount);
    if (response?.error) {
      toast.error(response.error);
    } else router.push(response);
  };

  return (
    <div className="bg-gray-100 h-full">
      <div className="flex justify-center items-center h-[calc(100vh_-_250px)] ">
        <form
          action={handlePayment}
          className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full"
        >
          <h2 className="text-2xl font-bold text-fuchsia-600 mb-4 text-center">
            Make a donation
          </h2>

          {/* donation frequency  */}
          <div className="mb-4">
            <label htmlFor="" className="text-sm font-medium text-gray-600">
              Donation Frequency
            </label>
            <div className="flex mt-2 space-x-2">
              {array?.map((item, index: number) => (
                <div
                  key={index}
                  className={`flex-1 text-center cursor-pointer focus:outline-0 border-[1px] border-gray-400 py-2 font-semibold ${
                    item.name === priceType.name
                      ? "bg-fuchsia-600 text-white"
                      : "bg-yellow-100 text-black"
                  }`}
                  onClick={() => {
                    setPriceType(item);
                    if (item.name !== priceType.name) setSelectAmount(0);
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>

          {/* select amount  */}
          <div className="mb-4">
            <label htmlFor="" className="text-sm font-medium text-gray-600">
              Select an amount
            </label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {priceType.prices?.map((amount, index: number) => (
                <div
                  key={index}
                  className={`flex-1 text-center cursor-pointer focus:outline-0 border-[1px] border-gray-400 py-2 font-semibold ${
                    amount === selectAmount
                      ? "bg-fuchsia-600 text-white border-gray-400"
                      : "bg-yellow-100 text-black border-gray-300"
                  }`}
                  onClick={() => setSelectAmount(amount)}
                >
                  {amount}
                </div>
              ))}

              <div className="border-2 relative p-2 border-gray-300 w-52">
                <input
                  type="number"
                  className="outline-0 pl-8 w-full"
                  placeholder="Enter the amount"
                />
                <span className="absolute bg-fuchsia-600 left-0 top-0 bottom-0 text-white px-3 py-1 text-xl">
                  $
                </span>
              </div>
            </div>
          </div>

          {/* personal information  */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-600">
              Personal Info
            </label>
            <input
              type="text"
              placeholder="Mehtab kazmi"
              className="mt-2 w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-400 mb-3"
            />
            <input
              type="email"
              placeholder="mehtab@gmail.com"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </div>

          {/* choose payment  */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-600">
              Choose Payment
            </label>
            <div className="mt-2">
              <div className="flex items-center mb-2">
                <input
                  id="card"
                  type="radio"
                  name="payment"
                  className="text-green-500 focus:ring-green-400"
                />
                <label htmlFor="card" className="ml-2 text-gray-700">
                  Debit or Credit card
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paypal"
                  type="radio"
                  name="payment"
                  className="text-green-500 focus:ring-green-400"
                />
                <label htmlFor="paypal" className="ml-2 text-gray-700">
                  Stripe
                </label>
              </div>
            </div>
          </div>

          {/* // submit  */}
          <button
            type="submit"
            className="w-full py-2 bg-fuchsia-600 text-white font-semibold rounded-md hover:bg-fuchsia-600/90 transition"
          >
            Submit Donation
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationPage;
