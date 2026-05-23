"use client";
import { Badge, Dropdown, DropdownItem, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import React from "react";
import * as basicTable2 from "@/app/components/tables/tableData";
import Image from "next/image";
import { TbDotsVertical }  from "react-icons/tb";
import { Icon } from "@iconify/react";
const BasicTable2 = () => {
  /*Table Action*/
  const tableActionData = [
    {
      icon: "solar:add-circle-outline",
      listtitle: "Add",
    },
    {
      icon: "solar:pen-new-square-broken",
      listtitle: "Edit",
    },
    {
      icon: "solar:trash-bin-minimalistic-outline",
      listtitle: "Delete",
    },
  ];
  return (
    <>
    
      <div className="border rounded-md border-ld overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="">
          <TableHead>
            <TableHeadCell className="text-base font-semibold py-3">
              User
            </TableHeadCell>
            <TableHeadCell className="text-base font-semibold py-3">
              Project Name
            </TableHeadCell>
            <TableHeadCell className="text-base font-semibold py-3">
              Users
            </TableHeadCell>
            <TableHeadCell className="text-base font-semibold py-3">
              Status
            </TableHeadCell>
            <TableHeadCell className="text-base font-semibold py-3"></TableHeadCell>
          </TableHead>
          <TableBody className="divide-y divide-border dark:divide-darkborder ">
            {basicTable2.basicTableData2.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="whitespace-nowrap">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={item.avatar}
                      alt="icon"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="truncat line-clamp-2  max-w-56">
                      <h6 className="text-base">{item.name}</h6>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <p className="text-darklink text-base">{item.post}</p>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="flex ">
                    {item.users.map((user, index) => (
                      <div className="-ms-2" key={index}>
                        <Image
                          src={user.icon}
                          className="border-2 border-white dark:border-darkborder rounded-full h-10 w-10 max-w-none"
                          alt="icon"
                        />
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge color={`light${item.statuscolor}`} className="capitalize">
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Dropdown
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() => (
                      <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                        <TbDotsVertical size={22} />
                      </span>
                    )}
                  >
                    {tableActionData.map((items, index) => (
                      <DropdownItem key={index} className="flex gap-3">
                        <Icon icon={`${items.icon}`} height={18} />
                        <span>{items.listtitle}</span>
                      </DropdownItem>
                    ))}
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </div>
     
    </>
  );
};

export default BasicTable2;
