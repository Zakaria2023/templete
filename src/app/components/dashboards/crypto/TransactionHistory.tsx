"use client"
import { Badge, Select, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react"
import CardBox from "../../shared/CardBox"
import cryptoCoin1 from "/public/images/svgs/icon-bitcoin.svg";
import cryptoCoin2 from "/public/images/crypto/ethereum-coin.webp";
import cryptoCoin3 from "/public/images/svgs/icon-ltc.svg";
import cryptoCoin4 from "/public/images/crypto/xrp-symbol-white-128.webp";
import cryptoCoin5 from "/public/images/crypto/bnb-icon2_2x.webp";
import cryptoCoin6 from "/public/images/crypto/solana.webp";
import Image from "next/image";


export const TransactionHistory = () => {
    const TradeHistory = [
        {
            key:"trade1",
            crytpoIcon:cryptoCoin1,
            cryptoCoin:"Bitcoin",
            crytpoSymbol:"BTC",
            price:"$981.1254",
            amount:"0.00345",
            date:"2024-5-18 15:14",
            transactionType:"Withdraw",
            status:"Completed",
            color:"error",
        },
        {
            key:"trade2",
            crytpoIcon:cryptoCoin2,
            cryptoCoin:"Etherium",
            crytpoSymbol:"ETH",
            price:"$2481.1254",
            amount:"1.3456",
            date:"2024-3-18 9:14",
            transactionType:"Deposit",
            color:"success",
            status:"Pending",
        },
        {
            key:"trade3",
            crytpoIcon:cryptoCoin3,
            cryptoCoin:"Litecoin",
            crytpoSymbol:"LTC",
            price:"$481.1254",
            amount:"7.3456",
            date:"2024-7-18 14:14",
            transactionType:"Transfer",
            color:"warning",
            status:"Completed",
        },
        {
            key:"trade4",
            crytpoIcon:cryptoCoin4,
            cryptoCoin:"Ripple",
            crytpoSymbol:"LTC",
            price:"$2341.1254",
            amount:"990.3456",
            date:"2024-3-18 10:14",
            transactionType:"Deposit",
            color:"success",
            status:"Failed",
        },
        {
            key:"trade6",
            crytpoIcon:cryptoCoin6,
            cryptoCoin:"Solana",
            crytpoSymbol:"SOL",
            price:"$441.1254",
            amount:"4.3456",
            date:"2023-12-18 14:14",
            transactionType:"Deposit",
            color:"success",
            status:"Completed",
        },
    ]
    return (
        <CardBox className="pb-0">
            <div className="sm:flex items-center justify-between mb-2">
                <div>
                    <h5 className="card-title">Crypto Transaction</h5>
                    <p className="card-subtitle">Your crypto transaction history</p>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-x-auto">
         <Table className="trade-history">
         <TableHead className="border-0">
          <TableRow>
              <TableHeadCell className="text-sm font-semibold ps-0">
                Asset
              </TableHeadCell>
              <TableHeadCell className="text-sm font-semibold">
                Amount
              </TableHeadCell>
              <TableHeadCell className="text-sm font-semibold">
                Type
              </TableHeadCell>
              <TableHeadCell className="text-sm font-semibold">
                Status
              </TableHeadCell>
              <TableHeadCell className="text-sm font-semibold">
                Time
              </TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className=" divide-border dark:divide-darkborder ">
              {TradeHistory.map((item, index) => (
                <>
              <TableRow key={index} className="bg-lightgray dark:bg-lightprimary rounded-md">
                  <TableCell className="whitespace-nowrap md:min-w-auto min-w-[200px]">
                    <div className="flex gap-3 items-center">
                      <Image
                        src={item.crytpoIcon}
                        alt="icon"
                        className={`${item.cryptoCoin==="Ethereum"?"icon-white":null} h-7 w-7 rounded-full`}
                      />
                      <div>
                      <h6 className="text-sm font-semibold mb-1">{item.cryptoCoin}</h6>
                      <p className="text-xs font-medium">{item.crytpoSymbol}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                  <h6 className="text-sm mb-1 flex items-center gap-2 font-medium">{item.price}
                  </h6>
                  <p className="text-xs font-medium">{item.amount} {item.crytpoSymbol}</p>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                  <Badge color={`${item.color}`} className="text-[13px] rounded-md py-1.1 sjustify-center" >{item.transactionType}</Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                   <div className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${item.status==="Pending"?"bg-warning":item.status==="Failed"?"bg-error":"bg-success"}`}></div>
                     <h6 className="text-sm font-medium">{item.status}</h6>
                   </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <p className="dark:text-white text-dark text-sm font-medium">
                      {item.date}
                    </p>
                  </TableCell>

                </TableRow>
                <TableRow key={item.key} className="bg-transparent dark:bg-dark block">
                <TableCell className="whitespace-nowrap py-3 px-0">
                </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-0">
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-0">
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-0">
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-0">
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 px-0">
                  </TableCell>
                </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
                        </div>
                    </div>
                </div>
            </div>
        </CardBox>

    )
}