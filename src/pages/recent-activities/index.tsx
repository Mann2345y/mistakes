import { PriceChangeIcon, SearchIcon } from "@/components/Icons";
import Table from "@/components/Table/Table";
import { whiteBlockClasses } from "@/styles/commonClasses";
import React, { useEffect, useState } from "react";
import moment from "moment-timezone";

const getRandomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

type ActivitiesTableRows = {
  date: React.JSX.Element;
  wallet: React.JSX.Element;
  nftsBurned: React.JSX.Element;
  tokensBurned: React.JSX.Element;
  pointsEarned: React.JSX.Element;
};

const Index = () => {
  const generateData = () =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      date: getRandomDate(new Date(2024, 0, 1), new Date()),
      tokenAddress: `0x${Math.random()
        .toString(16)
        .substr(2, 40)
        .padEnd(24, "0")}...`,
      nftsBurned: (Math.random() * 90 + 10).toFixed(0),
      tokensBurned: (Math.random() * 90 + 10).toFixed(0),
      pointsEarned: (Math.random() * 9000 + 1000).toFixed(0),
    }));

  const [data, setData] = useState<ActivitiesTableRows[]>([]);

  useEffect(() => {
    const dataArray = generateData();
    const tableRowsData = dataArray.map((row) => {
      const datePart = moment(row?.date)
        .tz("America/New_York") // Assuming EST is your time zone
        .format("DD MMM YYYY");

      // Format the time part with time zone
      const timePart = moment(row?.date)
        .tz("America/New_York")
        .format("HH:mm z (UTCZ)");
      return {
        date: (
          <div className="text-sm font-medium">
            <h5 className="text-black mb-1">{datePart}</h5>
            <p className="text-gren">{timePart}</p>
          </div>
        ),
        wallet: <div className="!font-bold">{row?.tokenAddress}</div>,
        nftsBurned: (
          <div className="!font-bold !text-right">{row?.nftsBurned}</div>
        ),
        tokensBurned: (
          <div className="!font-bold gap-3 flex items-center justify-end">
            {row?.tokensBurned}
          </div>
        ),
        pointsEarned: (
          <div className="!font-bold text-orange !text-right">
            {row?.pointsEarned}
          </div>
        ),
      };
    });

    setData(tableRowsData);
  }, []);

  return (
    <>
      <div className={`${whiteBlockClasses} mb-8`}>
        <h4 className="text-lg font-black leading-[30px] mb-2">
          RECENT ACTIVITIES
        </h4>
        <p className="font-semibold text-base leading-[25px]">
          Stay updated with all the latest transactions on our platform on the
          Recent Activities page. Here, you can view a real-time feed of users
          burning their digital assets, earning ShitPoints, earning OC Points,
          and acquiring EDULand NFTs. This page serves as your go-to source for
          the latest moves and shakes within the LFYM community, ensuring you
          never miss a beat in the evolving landscape of digital asset
          transformation.
        </p>
      </div>

      <div className={`${whiteBlockClasses} !font-inter`}>
        <Table
          headers={[
            { label: "DATE", value: "date" },
            { label: "WALLET", value: "wallet" },
            { label: "NFTS BURNED ", value: "nftsBurned", align: "right" },
            {
              label: "TOKENS BURNED",
              value: "tokensBurned",
              align: "right",
            },
            {
              label: "SHITPOINTS EARNED ",
              value: "pointsEarned",
              align: "right",
            },
          ]}
          data={data}
        />
      </div>
    </>
  );
};

export default Index;
