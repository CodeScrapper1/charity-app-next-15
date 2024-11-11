"use client";
import { navlinks } from "@/lib/data";
import {
  Facebook,
  Instagram,
  Layout,
  Linkedin,
  LogIn,
  LogOut,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { User } from "@nextui-org/user";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const session: any = useSession();
  const user = session?.data?.user;

  return (
    <header>
      <div className="bg-fuchsia-600 hidden md:flex justify-between items-center text-white text-sm p-2">
        <div className="mb-2 md:mb-0">
          <span className="mr-4">
            :round_pushpin: Akershusstranda 20, 0150 Oslo, Norway
          </span>
          <span>support@codescrapper.com</span>
        </div>
        <div className="flex space-x-4">
          <Linkedin size={25} />
          <Facebook size={25} />
          <Instagram size={25} />
          <Youtube size={25} />
        </div>
      </div>
      <nav className="bg-white container mx-auto flex justify-between items-center py-1 px-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/imgs/logo.png" className="w-24 h-24" alt="Donation app" />
          <span className="text-purple-500 text-xl md:block hidden font-semibold">
            Code Scrapper Charity
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-5">
          {navlinks?.map((item, index) => (
            <div key={index}>
              <Link href={item.link}>{item.text}</Link>
            </div>
          ))}
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                className="cursor-pointer"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              {user?.id ? (
                <>
                  <DropdownItem>
                    <User
                      name={user?.name}
                      description={user?.email}
                      avatarProps={{
                        src:
                          user?.image ||
                          "https://i.pravatar.cc/150?u=a04258114e29026702d",
                      }}
                    />
                  </DropdownItem>
                  <DropdownItem>
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <Layout size={18} /> Dashboard
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <div
                      className="flex items-center gap-2"
                      onClick={() => {
                        signOut({ redirect: false }).then(() => {
                          router.push("/login");
                        });
                      }}
                    >
                      <LogOut size={18} /> Logout
                    </div>
                  </DropdownItem>
                </>
              ) : (
                <>
                  <DropdownItem>
                    <Link href="/login" className="flex items-center gap-2">
                      <LogIn size={18} /> Login
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link href="/signup" className="flex items-center gap-2">
                      <LogIn size={18} /> Register
                    </Link>
                  </DropdownItem>
                </>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
