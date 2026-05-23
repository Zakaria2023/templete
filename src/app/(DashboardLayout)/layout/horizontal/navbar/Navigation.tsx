import { Icon } from "@iconify/react";
import { IconChevronDown } from "@tabler/icons-react";
import { Navbar, NavbarCollapse } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Menuitems from "../MenuData";
import ChildComponent from "./ChildComponent";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <Navbar
      fluid={true}
      rounded={true}
      className="horizontal-nav bg-transparent dark:bg-transparent sm:px-0 xl:py-4 py-0"
    >
      <NavbarCollapse className="xl:block">
        <ul className="flex items-center space-x-3">
          {Menuitems.map((item) => {
            let isActive = false;
            (item.children || []).find((child: any) => {
              if (child?.children) {
                const nestedvalue = child.children.find(
                  (value: any) => value.href === pathname,
                );
                if (nestedvalue) {
                  isActive = true;
                }
              } else {
                if (child.href === pathname) {
                  isActive = true;
                }
              }
            });

            return (
              <li key={item.id} className="relative group/navitem">
                {item.children ? (
                  <div className="relative">
                    <p
                      className={`w-full ${
                        isActive
                          ? "text-white bg-primary shadow-btnshdw"
                          : "group-hover/navitem:bg-lightprimary group-hover/navitem:text-primary"
                      } py-2 px-3 rounded-md flex gap-3 items-center text-ld cursor-pointer select-none`}
                    >
                      <span className="flex gap-2 items-center w-full">
                        <Icon icon={`${item.icon}`} height={18} />
                        <span>{item.title}</span>
                        <IconChevronDown size={18} className="ms-auto" />
                      </span>
                    </p>
                    {/* pt-2 bridges the visual gap so the group-hover stays active */}
                    <div
                      className={`absolute left-0 rtl:right-0 top-full pt-2 hidden group-hover/navitem:block z-50 ${(item as any).column == 4 ? "w-screen max-w-[800px]" : "w-52"}`}
                    >
                      <div className="bg-white dark:bg-dark rounded-md shadow-lg">
                        <ul
                          className={`p-3 text-sm gap-2 ${(item as any).column == 4 ? "two-cols" : "flex flex-col"}`}
                        >
                          {item.children.map((child) => (
                            <li
                              key={child.id}
                              className={`${(item as any).column == 4 ? "mb-2" : ""}`}
                            >
                              <ChildComponent
                                item={child}
                                title={item.title}
                                isActive={true}
                                handleMouseEnter={() => {}}
                                handleMouseLeave={() => {}}
                                onClick={() => {}}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link href={item.href}>
                    <p
                      className={`py-2 px-3 rounded-md flex gap-3 items-center ${isActive ? "bg-primary text-white" : "group-hover/navitem:bg-lightprimary group-hover/navitem:text-primary"}`}
                    >
                      <Icon icon={`${item.icon}`} height={18} />
                      <span>{item.title}</span>
                    </p>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Navigation;
