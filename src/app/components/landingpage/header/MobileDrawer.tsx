"use client";
import React, { useState } from "react";
import { Button, Drawer, DrawerItems } from "flowbite-react";
import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo";
import MobileDemosMenu from "./MobileDemoMenus";
const MobileDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  return (
    <>
      <div className="xl:hidden flex">
        <Button
          onClick={() => setIsOpen(true)}
          className="flex items-center p-0 justify-center text-dark dark:text-white  h-10 w-10 rounded-full bg-transparent hover:bg-lightprimary"
        >
          <IconMenu2 className="!shrink-0" />
        </Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerItems className="p-6">
          <FullLogo />
          <MobileDemosMenu />
          <Link
            className="block py-3 text-base text-dark dark:text-white font-semibold"
            href={"https://demos.adminmart.com/premium/nextjs/matdash-nextjs/docs/index.html"}
          >
            Documentation
          </Link>
          <Link
            className="block py-3 text-base text-dark dark:text-white font-semibold"
            href={"https://adminmart.com/support/"}
          >
            Support
          </Link>
          <Button
            color={"primary"}
            className="mt-2"
            as={Link}
            href="/auth/auth2/login"
          >
            Login
          </Button>
        </DrawerItems>
      </Drawer>
    </>
  );
};

export default MobileDrawer;
