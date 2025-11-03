"use client";

import { userSidebarLinks, adminSidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { SignedOut, useUser } from "@clerk/nextjs";

const LeftSidebar = () => {
  const { user } = useUser(); // Gives access to full user object
  const pathname = usePathname();

  // Get role safely from Clerk's user public metadata
  const role = user?.publicMetadata?.role || "user";

  // Pick sidebar links based on role
  const sidebarLinks = role === "admin" ? adminSidebarLinks : userSidebarLinks;

  return (
    <section
      className="background-light900_dark200 light-border custom-scrollbar
      sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto 
      border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]"
    >
      {/* Top Links */}
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          // For profile route, attach userId dynamically
          if (item.route === "/profile") {
            if (user?.id) {
              item.route = `${item.route}/${user.id}`;
            } else {
              return null;
            }
          }

          return (
            <Link
              href={item.route}
              key={item.label}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p
                className={`${
                  isActive ? "base-bold" : "base-medium"
                } max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>

      {/* When signed out */}
      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">Log In</span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="sign up"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Sign up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
