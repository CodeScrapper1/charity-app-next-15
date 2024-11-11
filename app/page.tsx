import CharityIcons from "@/components/home/CharityIcons";
import ContactForm from "@/components/home/ContactForm";
import Couses from "@/components/home/Couses";
import LatestNews from "@/components/home/LatestNews";
import OurStories from "@/components/home/OurStories";
import Slider from "@/components/home/Slider";
import Volunteer from "@/components/home/Volunteer";
import { db } from "@/lib/db";
import { Button } from "@nextui-org/button";
import { News } from "@prisma/client";

export default async function Home() {
  const news: News[] = await db.news.findMany({ skip: 0, take: 2 });
  console.log(news);

  return (
    <div className="">
      <Slider />
      <CharityIcons />
      <OurStories />
      <Couses />
      <Volunteer />
      <LatestNews news={news} />
      <ContactForm />
    </div>
  );
}
