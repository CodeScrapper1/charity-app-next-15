import SingleNews from "@/components/SingleNews";
import { db } from "@/lib/db";
import { News } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const NewsDetail = async ({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) => {
  const { newsId } = await params;

  const [news, popularNews] = await db?.$transaction([
    db.news.findUnique({ where: { id: newsId } }),
    db.news.findMany({ where: { NOT: { id: newsId } }, skip: 0, take: 2 }),
  ]);

  if (!news) {
    redirect("/news");
  }

  return (
    <>
      <div className="max-w-6xl mx-auto mt-10">
        <img
          src={news?.image || ""}
          className="w-full h-80 object-cover rounded-md"
          alt=""
        />
        <div className="container mx-auto">
          <h2 className="text-4xl font-semibold my-2 text-center">
            {news?.title}
          </h2>
          <p className="text-slate-400 text-sm">Lifestyle, Clothing Donation</p>
          <p className="text-slate-400 mt-2">{news?.description}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 w-full max-w-6xl m-auto gap-4 px-2 text-center py-8">
        {popularNews.map((item: News, index: number) => (
          <SingleNews key={index} item={item} />
        ))}
      </div>
    </>
  );
};

export default NewsDetail;
