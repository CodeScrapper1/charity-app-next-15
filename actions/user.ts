"use server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const registerUser = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!name || !email || !password || !confirmPassword) {
    return { error: "please fill all fields" };
  }

  if (password != confirmPassword) {
    return { error: "Password not matched" };
  }
  try {
    const existingUser = await db.user.findUnique({ where: { email } });

    if (existingUser) {
      return { error: "User aleady exist" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: { name, email, password: hashedPassword },
    });

    if (!user) {
      return { error: "User not created" };
    }

    return {
      message: "User created successfully",
      success: true,
      result: user,
    };
  } catch (error) {
    console.log(error, "error");
    return { error: "User not created" };
  }
};

// edit user
export const editUser = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!id) {
    return { error: "User not found" };
  }

  try {
    const user = await db.user.findUnique({ where: { NOT: { id }, email } });

    if (user) {
      return { error: "this emial is already exist" };
    }

    const updateUser = await db.user.update({
      where: { id },
      data: { name, email },
    });

    if (!updateUser) {
      return { error: "User not updated" };
    }

    return {
      message: "user updated successfully",
      success: true,
      result: updateUser,
    };
  } catch (error) {
    console.log(error, "error");
    return { error: "User not updated" };
  }
};

export const changePassword = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!id) {
    return { error: "User not found" };
  }
  if (password != confirmPassword) {
    return { error: "Password not matched" };
  }

  try {
    const hashpassword = await bcrypt.hash(password, 10);

    const updateUser = await db.user.update({
      where: { id },
      data: { password: hashpassword },
    });

    if (!updateUser) {
      return { error: "Passsword not Changed" };
    }

    return {
      message: "Password updated successfully",
      success: true,
      result: updateUser,
    };
  } catch (error) {
    return { error: "Passsword not Changed" };
  }
};
