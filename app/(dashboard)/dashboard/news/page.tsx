import NewsTable from "@/components/dashboard/NewsTable";
import { db } from "@/lib/db";
import React from "react";

const News = async () => {
  const news = await db.news.findMany();
  return <NewsTable news={news} />;
};

export default News;
