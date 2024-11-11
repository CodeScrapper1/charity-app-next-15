import { DollarSign, Settings, Users } from "lucide-react";

export const navlinks = [
  {
    link: "/",
    text: "Home",
    exact: true,
  },
  {
    link: "/news",
    text: "News",
    exact: true,
  },
  {
    link: "/contact",
    text: "Contact",
    exact: true,
  },
  {
    link: "/donation",
    text: "Donate",
    style: "border",
    exact: true,
  },
];

// dashboard routes
export const navItems = [
  { name: "Dashboard", icon: DollarSign, href: "/dashboard" },
  { name: "News", icon: Users, href: "/dashboard/news" },
  { name: "Volunteers", icon: Users, href: "/dashboard/volunteers" },
  { name: "Donations", icon: DollarSign, href: "/dashboard/donation" },
  { name: "Settings", icon: Settings, href: "/dashboard/profile" },
];

// carousel array
export const homeCarousel = [
  { img: "/imgs/baner-1.jpg", title: "be a Kind Heart" },
  { img: "/imgs/baner-2.jpg", title: "be a Kind Heart" },
  { img: "/imgs/baner-3.jpg", title: "be a Kind Heart" },
];

// icons
export const iconsData = [
  { image: "/imgs/icons/hands.png" },
  { image: "/imgs/icons/heart.png" },
  { image: "/imgs/icons/scholarship.png" },
  { image: "/imgs/icons/receive.png" },
];

// couses
export const causeData = [
  {
    image: "/imgs/cause-1.jpg",
    title: "Poverty Development",
    desc: "Sed leo nisl, posuere at molestie ac, suscipit auctor mauris. Etiam quis metus tempor",
  },
  {
    image: "/imgs/cause-2.jpg",
    title: "Poverty Development",
    desc: "Sed leo nisl, posuere at molestie ac, suscipit auctor mauris. Etiam quis metus tempor",
  },
  {
    image: "/imgs/cause-3.jpg",
    title: "Poverty Development",
    desc: "Sed leo nisl, posuere at molestie ac, suscipit auctor mauris. Etiam quis metus tempor",
  },
];
