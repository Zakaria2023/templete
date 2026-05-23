"use client";
import { CustomizerContext } from "@/app/context/CustomizerContext";
import { Icon } from "@iconify/react";
import "flowbite";
import { DrawerItems, Navbar, NavbarCollapse } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Messages from "./Messages";
import Profile from "./Profile";
import Search from "./Search";

import { Drawer } from "flowbite-react";
import HorizontalMenu from "../../horizontal/header/HorizontalMenu";
import FullLogo from "../../shared/logo/FullLogo";
import MobileSidebar from "../sidebar/MobileSidebar";
import { Language } from "./Language";
import MobileHeaderItems from "./MobileHeaderItems";

// ─── Nav groups (mirrors sidebar headings) ────────────────────────────────────
const navGroups = [
  {
    label: "Academic",
    icon: "tabler:book",
    links: [
      { label: "Students", icon: "tabler:users", href: "/academic/students" },
      {
        label: "Teachers",
        icon: "tabler:chalkboard",
        href: "/academic/teachers",
      },
    ],
  },
  {
    label: "Settings",
    icon: "tabler:settings-2",
    links: [
      {
        label: "School Settings",
        icon: "tabler:school",
        href: "/settings/school",
      },
      {
        label: "Academic Year",
        icon: "tabler:calendar-stats",
        href: "/settings/academic-year",
      },
    ],
  },
];

function HeaderNavDropdowns() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-1">
      {navGroups.map((group) => {
        const isActive = group.links.some((l) => pathname === l.href);
        return (
          <div key={group.label} className="relative group/hdrop">
            <button
              type="button"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors select-none ${
                isActive
                  ? "bg-primary text-white"
                  : "text-link dark:text-darklink group-hover/hdrop:bg-lightprimary group-hover/hdrop:text-primary"
              }`}
            >
              <Icon icon={group.icon} height={17} />
              <span>{group.label}</span>
              <Icon
                icon="tabler:chevron-down"
                height={13}
                className="opacity-70 transition-transform duration-200 group-hover/hdrop:rotate-180"
              />
            </button>
            {/* Dropdown — pt-1 bridges the gap so hover stays active */}
            <div className="absolute left-0 top-full pt-1 hidden group-hover/hdrop:block z-50 w-52">
              <div className="bg-white dark:bg-dark rounded-xl shadow-xl border border-border dark:border-darkborder py-1 overflow-hidden">
                {group.links.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <span
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        pathname === link.href
                          ? "text-primary bg-lightprimary font-semibold"
                          : "text-ld hover:bg-lightgray dark:hover:bg-darkgray/20 hover:text-primary"
                      }`}
                    >
                      <Icon icon={link.icon} height={16} className="shrink-0" />
                      {link.label}
                      {pathname === link.href && (
                        <Icon
                          icon="tabler:check"
                          height={13}
                          className="ml-auto text-primary"
                        />
                      )}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}

interface HeaderPropsType {
  layoutType: string;
}

const Header = ({ layoutType }: HeaderPropsType) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { setIsCollapse, isCollapse, isLayout, setActiveMode, activeMode } =
    useContext(CustomizerContext);

  const [mobileMenu, setMobileMenu] = useState("");

  const handleMobileMenu = () => {
    if (mobileMenu === "active") {
      setMobileMenu("");
    } else {
      setMobileMenu("active");
    }
  };

  const toggleMode = () => {
    setActiveMode((prevMode: string) =>
      prevMode === "light" ? "dark" : "light",
    );
  };

  // mobile-sidebar
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <header
        className={`sticky top-0 z-[2] ${
          isSticky
            ? "bg-white dark:bg-dark shadow-md fixed w-full"
            : "bg-transparent"
        }`}
      >
        <Navbar
          fluid
          className={`rounded-none bg-transparent dark:bg-transparent py-4 sm:px-6 ${
            layoutType == "horizontal" ? "container mx-auto" : ""
          }  ${isLayout == "full" ? "!max-w-full" : ""}`}
        >
          {/* Mobile Toggle Icon */}
          <span
            onClick={() => setIsOpen(true)}
            className="px-[15px] hover:text-primary dark:hover:text-primary text-link dark:text-darklink relative after:absolute after:w-10 after:h-10 after:rounded-full hover:after:bg-lightprimary  after:bg-transparent rounded-full xl:hidden flex justify-center items-center cursor-pointer"
          >
            <Icon icon="tabler:menu-2" height={20} />
          </span>
          {/* Toggle Icon   */}
          <NavbarCollapse className="xl:!block !hidden">
            <div className="flex gap-0 items-center relative">
              {layoutType == "horizontal" ? (
                <div className="me-3">
                  <FullLogo />
                </div>
              ) : null}
              {/* Toggle Menu    */}
              {layoutType != "horizontal" ? (
                <span
                  onClick={() => {
                    if (isCollapse === "full-sidebar") {
                      setIsCollapse("mini-sidebar");
                    } else {
                      setIsCollapse("full-sidebar");
                    }
                  }}
                  className="px-[15px] relative after:absolute after:w-10 after:h-10 after:rounded-full hover:after:bg-lightprimary  after:bg-transparent text-link hover:text-primary dark:text-darklink dark:hover:text-primary rounded-full justify-center items-center cursor-pointer xl:flex hidden"
                >
                  <Icon icon="tabler:menu-2" height={20} />
                </span>
              ) : null}

              <Search />

              {/* Nav Dropdowns */}
              <HeaderNavDropdowns />
            </div>
          </NavbarCollapse>

          {/* mobile-logo */}
          <div className="block xl:hidden">
            <FullLogo />
          </div>

          <NavbarCollapse className="xl:!block !hidden md:!hidden">
            <div className="flex gap-0 items-center">
              {/* Theme Toggle */}
              {activeMode === "light" ? (
                <div
                  className=" hover:text-primary px-15 group  dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-link dark:text-darklink relative"
                  onClick={toggleMode}
                >
                  <span className="flex items-center justify-center relative after:absolute after:w-10 after:h-10 after:rounded-full after:-top-1/2   group-hover:after:bg-lightprimary">
                    <Icon
                      icon="tabler:moon"
                      width="20"
                      // className="text-link group-hover:text-primary"
                    />
                  </span>
                </div>
              ) : (
                // Dark Mode Button
                <div
                  className=" hover:text-primary px-15   dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-link dark:text-darklink group relative"
                  onClick={toggleMode}
                >
                  <span className="flex items-center justify-center relative after:absolute after:w-10 after:h-10 after:rounded-full after:-top-1/2   group-hover:after:bg-lightprimary">
                    <Icon
                      icon="solar:sun-bold-duotone"
                      width="20"
                      className="group-hover:text-primary"
                    />
                  </span>
                </div>
              )}
              {/* Language Dropdown*/}
              <Language />

              {/* Messages Dropdown */}
              <Messages />

              {/* Profile Dropdown */}
              <Profile />
            </div>
          </NavbarCollapse>
          {/* Mobile Toggle Icon */}
          <span
            className="h-10 w-10 flex xl:hidden hover:text-primary hover:bg-lightprimary rounded-full justify-center items-center cursor-pointer"
            onClick={handleMobileMenu}
          >
            <Icon icon="tabler:dots" height={21} />
          </span>
        </Navbar>
        <div
          className={`w-full  xl:hidden block mobile-header-menu ${mobileMenu}`}
        >
          <MobileHeaderItems />
        </div>

        {/* Horizontal Menu  */}
        {layoutType == "horizontal" ? (
          <div className="xl:border-y xl:border-ld">
            <div
              className={`${isLayout == "full" ? "w-full px-6" : "container"}`}
            >
              <HorizontalMenu />
            </div>
          </div>
        ) : null}
      </header>

      {/* Mobile Sidebar */}
      <Drawer open={isOpen} onClose={handleClose} className="w-64">
        <DrawerItems>
          <MobileSidebar />
        </DrawerItems>
      </Drawer>
    </>
  );
};

export default Header;
