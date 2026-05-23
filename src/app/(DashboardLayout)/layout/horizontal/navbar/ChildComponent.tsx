import { Icon } from "@iconify/react";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const ChildComponent = ({
  item,
  isActive,
  handleMouseEnter,
  handleMouseLeave,
  onClick,
  title,
}: any) => {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <div className="relative group/child" onClick={onClick}>
      <Link href={item.href || "#"}>
        <p
          className={`w-full ${
            item.href === pathname
              ? "text-primary dark:text-primary"
              : "hover:text-primary hover:bg-lightprimary"
          } py-1 px-3 rounded-md flex gap-3 items-center text-ld`}
        >
          <span className="flex gap-3 items-center w-full">
            <Icon icon={`${item.icon}`} height={18} />
            <span className="line-clamp-1 max-w-24 overflow-hidden">
              {t(`${item.title}`)}
            </span>
            {item.children && <IconChevronDown size={18} className="ms-auto" />}
          </span>
        </p>
      </Link>
      {item.children && (
        <div
          className={`absolute top-0 w-56 hidden group-hover/child:block z-50 ${
            title === "Tables" ? "tables-position" : "left-full rtl:right-full"
          }`}
        >
          <ul className="bg-white dark:bg-dark rounded-md shadow-lg p-3 flex flex-col gap-2">
            {item.children.map((child: any) => (
              <li key={child.id}>
                {child.children ? (
                  <ChildComponent
                    item={child}
                    isActive={isActive}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                  />
                ) : (
                  <Link href={child.href}>
                    <p
                      className={`group/menu hover:text-primary ${
                        child.href == pathname
                          ? "!text-primary"
                          : "hover:bg-lightprimary"
                      } py-1 px-3 rounded-md flex gap-2 items-center text-ld opacity-80`}
                    >
                      <span
                        className={`${
                          child.href == pathname
                            ? "bg-primary dark:bg-primary"
                            : "bg-dark dark:bg-white"
                        } group-hover/menu:bg-primary rounded-md mx-1.5 h-[6px] w-[6px]`}
                      ></span>
                      {t(`${child.title}`)}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChildComponent;
