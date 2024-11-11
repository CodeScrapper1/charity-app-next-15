import { News } from "@prisma/client";
import Link from "next/link";
import React from "react";

const LatestNews = ({ news }: { news: News[] }) => {
  return (
    <div className="w-11/12 mx-auto px-4 py-20">
      <h1 className="md:text-4xl text-xl text-center pb-10 font-serif font-bold">
        Latest News
      </h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {news?.map((item: News, index: number) => (
            <Link href={`/news/${item?.id}`} key={index}>
              <img
                src={item.image || ""}
                alt="News 1"
                className="w-full h-80 object-cover rounded-md"
              />
              <div className="p-4 bg-white rounded-b-md shadow">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-slate-400 text-sm">
                  Lifestyle, Clothing Donation
                </p>
                <p className="text-slate-400 mt-2">{item.description}</p>
              </div>
            </Link>
          ))}
          <div className="">
            <h1 className="text-2xl font-bold">Food donation area</h1>
            <p className="text-gray-500">
              Sed leo nisl, posuere at molestie ac, suscipit auctor mauris.
              Etiam quis metus elementum, tempor risus vel, condimentum orci
            </p>
          </div>
        </div>

        {/* side bar  */}
        <aside className="flex flex-col gap-7">
          {/* Search */}
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 py-2 px-4 focus:outline-none"
            placeholder="Search..."
          />

          {/* Recent News */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recent News</h3>
            <div className="space-y-2">
              {news?.length
                ? news?.map((item: News, index) => (
                    <Link
                      key={index}
                      href={`news/${item.id}`}
                      className="grid grid-cols-[0.7fr_1fr] items-center gap-2"
                    >
                      <img
                        src={item?.image || ""}
                        className="w-36 h-36 object-cover rounded-lg"
                        alt={item?.title}
                      />
                      <strong>{item?.title}</strong>
                    </Link>
                  ))
                : Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <img
                        src="/imgs/news-3.jpg"
                        className="w-40 rounded-lg"
                        alt=""
                      />
                      <strong>Food donation area</strong>
                    </div>
                  ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-red-100 p-10 rounded-lg h-56  items-center">
            <h3 className="text-lg font-semibold mb-2">Newsletter Form</h3>
            <input
              type="email"
              className="w-full rounded-lg border border-gray-300 py-2 px-4 focus:outline-none mb-2"
              placeholder="Email address"
            />
            <button className="w-full bg-fuchsia-600 text-white py-2 rounded-lg">
              Submit
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LatestNews;
