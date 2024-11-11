import SingleNews from "@/components/SingleNews";
import { db } from "@/lib/db";
import { News } from "@prisma/client";
import React from "react";

const NewsPage = async () => {
  const news: News[] = await db.news.findMany();
  return (
    <div>
      <h1 className="md:text-4xl text-xl text-center pb-10 font-serif font-bold">
        Latest News
      </h1>
      <div>
        <div className="grid md:grid-cols-3 grid-cols-1 w-full max-w-6xl m-auto gap-4 px-2 text-center py-8">
          {news?.map((item: News, index: number) => (
            <SingleNews key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
