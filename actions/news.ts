"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createNews = async (
  formData: FormData,
  image: string,
  id: string
) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title || !description || !image) {
    return { error: "Please fill all the fields" };
  }

  let response;
  try {
    if (id) {
      response = await db.news.update({
        where: { id },
        data: { title, description, image },
      });
    } else {
      response = await db.news.create({
        data: { title, description, image },
      });
    }
    if (response) {
      revalidatePath("/dashboard/news");
      return {
        message: `News ${id ? "Updated" : "Created"} successfully`,
        success: true,
        result: response,
      };
    } else {
      return {
        error: "News Not Created!",
      };
    }
  } catch (error) {
    console.log(error, "error");
    return {
      error: "News Not Created!",
    };
  }
};

export const deleteNews = async (id: string) => {
  try {
    const news = await db.news.findUnique({ where: { id } });

    if (!news) {
      return { error: "News not found" };
    }
    const response = await db.news.delete({ where: { id } });
    if (response) {
      revalidatePath("/dashboard/news");
      return {
        message: "News Deleted successfully",
        success: true,
        result: response,
      };
    } else {
      return { error: "News not deleted" };
    }
  } catch (error) {
    console.log(error, "error");
    return { error: "News not deleted" };
  }
};
