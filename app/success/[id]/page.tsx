import { updateDonation } from "@/actions/donation";
import { redirect } from "next/navigation";
import React from "react";

const DonationId = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let isSuccess = false;
  const res = await updateDonation(id);
  if (res.success) {
    isSuccess = true;
    redirect("/");
  }

  return (
    <div className="grid items-center justify-center h-[90vh]">
      {isSuccess && (
        <div className="flex justify-center items-center gap-10 flex-col">
          <img src="/success.png" className="w-40 h-40" />
          <h1 className="text-4xl text-green-500">Successfull payment</h1>
        </div>
      )}
    </div>
  );
};

export default DonationId;
