"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { homeCarousel } from "@/lib/data";
import { Heart } from "lucide-react";

const Slider = () => {
  return (
    <div className="relative h-[600px] w-full">
      <Carousel
        autoPlay
        infiniteLoop
        showArrows={true}
        showStatus={true}
        className="w-full"
      >
        {homeCarousel?.map((item, index: number) => (
          <div key={index} className="h-[600px]">
            <img
              src={item.img}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </Carousel>
      <div className="bg-white absolute right-0 md:-right-8 bottom-0 rounded-0 md:px-8  px-2 text-fuchsia-600 md:-skew-x-12 text-center uppercase">
        <div className="flex items-center gap-1">
          <img src="/imgs/logo.png" alt="" className="md:w-40 w-20" />
          <h1 className="font-serif sm:text-3xl text-lg">be a kind Heart</h1>
          <Heart />
        </div>
      </div>
    </div>
  );
};

export default Slider;
