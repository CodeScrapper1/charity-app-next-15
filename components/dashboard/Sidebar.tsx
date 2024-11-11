"use client";
import { INavItem } from "@/interfaces";
import { navItems } from "@/lib/data";
import { Heart, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  return (
    <div className="h-screen">
      <button
        className="fixed bg-white w-full top-0 left-0 p-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X /> : <Menu />}
      </button>
      <div className="h-full w-64 p-4 bg-gray-50">
        <Link href="/" className="flex items-center">
          <Heart className="w-6 h-6 mr-2 text-primary" />
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            Charity App
          </span>
        </Link>
        <ul className="space-y-2 font-semibold">
          {navItems?.map((item: INavItem, index: number) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center gap-2 p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <item.icon className="w-5 h-5 text-gray-500 transition duration-75" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
