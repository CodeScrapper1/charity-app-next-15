"use client";
import { changePassword, editUser } from "@/actions/user";
import { IUser } from "@/interfaces";
import { Input } from "@nextui-org/react";
import { Edit } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const ProfilePage = ({ user }: { user: IUser }) => {
  const handleEditUser = async (formData: FormData) => {
    const response = await editUser(formData);
    if (response?.success) {
      const res = await signIn("credentials", {
        redirect: false,
        email: response?.result?.email,
        isUpdate: true,
      });
      toast.success(response.message);
      window.location.reload();
    } else {
      toast.error(response.error);
    }
  };

  const handlePassword = async (formData: FormData) => {
    const response = await changePassword(formData);
    if (response?.success) {
      toast.success(response.message);
    } else {
      toast.error(response.error);
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-28 h-28 mb-4">
          <Image
            src="/imgs/mypic.jpg"
            alt="Profile picture"
            layout="fill"
            className="rounded-full object-cover"
          />
        </div>
        <button className="bg-fuchsia-600 text-white px-4 py-2 rounded hover:bg-fuchsia-600/90">
          Connect to Code Scrapper
        </button>
        <button className="text-sm font-bold my-4 text-center flex items-center gap-2">
          <Edit size={12} /> Edit
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>
      <form action={handleEditUser}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            defaultValue={user?.id || ""}
            variant="bordered"
            className="max-w-sx hidden"
            name="id"
          />
          <Input
            defaultValue={user?.name || ""}
            variant="bordered"
            placeholder="Enter your full name"
            className="max-w-sx"
            name="name"
            label="Full Name"
          />
          <Input
            defaultValue={user?.email || ""}
            variant="bordered"
            placeholder="Enter your email"
            className="max-w-sx"
            name="email"
            label="Email"
          />
        </div>
        <div className="flex justify-end p-6">
          <button
            type="submit"
            className="bg-fuchsia-600 text-white px-4 py-2 rounded hover:bg-fuchsia-600/90"
          >
            Save
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
        <form action={handlePassword}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              defaultValue={user?.id || ""}
              variant="bordered"
              className="max-w-sx hidden"
              name="id"
            />
            <Input
              variant="bordered"
              placeholder="Enter the password"
              className="max-w-sx"
              name="password"
              label="New Password"
              type="password"
            />
            <Input
              variant="bordered"
              placeholder="Please Confirm Password"
              className="max-w-sx"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
            />
          </div>
          <div className="flex justify-end p-6">
            <button
              type="submit"
              className="bg-fuchsia-600 text-white px-4 py-2 rounded hover:bg-fuchsia-600/90"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
