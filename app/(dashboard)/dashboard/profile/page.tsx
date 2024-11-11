import ProfilePage from "@/components/dashboard/ProfilePage";
import { IUser } from "@/interfaces";
import { getAuthSession } from "@/lib/auth";
import React from "react";

const Profile = async () => {
  const session = await getAuthSession();
  const user: IUser = session?.user ?? {};
  return <ProfilePage user={user} />;
};

export default Profile;
