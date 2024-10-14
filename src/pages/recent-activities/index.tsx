import { PriceChangeIcon, SearchIcon } from "@/components/Icons";
import Table from "@/components/Table/Table";
import { whiteBlockClasses } from "@/styles/commonClasses";
import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import { API_ROUTES } from "@/services/routes";
import useGenericQuery from "@/services/useGenericQuery";

const getRandomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

type ActivitiesTableRows = {
  date: React.JSX.Element;
  wallet: React.JSX.Element;
  nftsBurned: React.JSX.Element;
  tokensBurned: React.JSX.Element;
  pointsEarned: React.JSX.Element;
};

type GlobalData = {
  total_global_points: string;
  total_global_nft_burned: string;
  total_global_token_burned: string;
  recent_transactions: {
    ocid: string;
    wallet: string;
    t_add: string;
    t_id: string;
    score_earned: string;
    txn_hash: string;
    timestamp: string;
  }[];
};

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [tableData, setTableData] = useState<ActivitiesTableRows[]>([]);

  const { data } = useGenericQuery(
    [API_ROUTES.GET_GLOBAL_DETAILS,pageSize.toString(),currentPage.toString()],
    API_ROUTES.GET_GLOBAL_DETAILS
  );

  useEffect(() => {
    const dataArray = (data as any)?.recent_transactions;
    console.log(dataArray, "recent Activities dataArray");
    const tableRowsData = dataArray?.map((row) => {
      const datePart = moment(row?.timestamp)
        .tz("America/New_York") // Assuming EST is your time zone
        .format("DD MMM YYYY");

      // Format the time part with time zone
      const timePart = moment(row?.timestamp)
        .tz("America/New_York")
        .format("HH:mm z (UTCZ)");
      return {
        date: (
          <div className="text-sm font-medium">
            <h5 className="text-black mb-1">{datePart}</h5>
            <p className="text-gren">{timePart}</p>
          </div>
        ),
        wallet: (
          <div className="!font-bold">{`${row?.wallet.slice(0, 10)}...${row?.wallet.slice(38,42)}`}</div>
        ),
        nftsBurned: (
          <div className="!font-bold !text-right">{row?.nftsBurned}</div>
        ),
        tokensBurned: (
          <div className="!font-bold gap-3 flex items-center justify-end">
            {"n/a"}
          </div>
        ),
        pointsEarned: (
          <div className="!font-bold text-orange !text-right">
            {row?.score_earned}
          </div>
        ),
      };
    });

    setTableData(tableRowsData);
  }, [data]);

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
          data={tableData}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
        />
      </div>
    </>
  );
};

export default Index;
