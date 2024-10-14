import React, { useEffect, useState } from "react";
import Table from "@/components/Table/Table";
import { API_ROUTES } from "@/services/routes";
import useGenericQuery from "@/services/useGenericQuery";
import { whiteBlockClasses } from "@/styles/commonClasses";
import UserImageIcon from "../../../public/images/userimage.png";
import Image from "next/image";

type LeaderboardTableRows = {
  rank?: React.JSX.Element;
  ocid?: React.JSX.Element;
  nftsBurned?: React.JSX.Element;
  tokensBurned?: React.JSX.Element;
  pointsEarned?: React.JSX.Element;
};

const Index = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data } = useGenericQuery(
    [API_ROUTES.GET_LEADERBOARD, pageSize.toString(), currentPage.toString()],
    API_ROUTES.GET_LEADERBOARD
  );

  const generateData = () =>
    Array.from({ length: 15 }, (_, i) => ({
      rank: i + 1,
      ocid: [
        "raymondhyip.edu",
        "sarahsmith.edu",
        "ArtBlock",
        "TokenTree",
        "PixelPort",
        "Quantumbits",
        "LegacyLedger",
        "MysticMint",
        "EchoAsset",
        "CryptoCanvas",
      ][Math.floor(Math.random() * 10)],
      userImage: UserImageIcon,
      nftsBurned: (Math.random() * 900 + 100).toFixed(2),
      tokensBurned: (Math.random() * 900 + 100).toFixed(2),
      pointsEarned: (Math.random() * 900000 + 100000).toFixed(2),
    }));

  const [mockData, setMockData] = useState<LeaderboardTableRows[]>([]);

  useEffect(() => {
    const dataArray = generateData();

    const tableRowsData = dataArray.map((row) => {
      return {
        rank: <div className=" !font-bold">{row?.rank}</div>,
        ocid: (
          <div className="flex items-center gap-3">
            <Image
              src={row?.userImage}
              alt="User Image"
              className="w-8 h-8 rounded-full"
            />
            <p className="font-bold">{row?.ocid}</p>
          </div>
        ),
        nftsBurned: (
          <div className="!font-bold !text-right">{row?.nftsBurned}</div>
        ),
        tokensBurned: (
          <div className="!font-bold !text-right">{row?.tokensBurned}</div>
        ),
        pointsEarned: (
          <div className="!font-bold !text-orange !text-right">
            {row?.pointsEarned}
          </div>
        ),
      };
    });

    setMockData(tableRowsData);
  }, []);

  return (
    <>
      <div className={`${whiteBlockClasses} mb-6`}>
        <h4 className="text-lg font-black leading-[30px] mb-2">LEADERBOARD</h4>
        <p className="font-semibold text-base leading-[25px]">
          Explore our dynamic Leaderboard to see who’s leading in transforming
          digital waste into wealth. This page ranks users based on the amount
          of Shitcoins they’ve earned by burning their underperforming NFTs and
          tokens. Check out who’s turning their digital clutter into valuable
          educational assets and see where you stand among the pioneers of this
          transformative journey!
        </p>
      </div>

      <div className={`${whiteBlockClasses}`}>
        <Table
          headers={[
            { label: "RANK", value: "rank" },
            { label: "OCID", value: "ocid" },
            { label: "NFTS BURNED", value: "nftsBurned", align: "right" },
            {
              label: "TOKENS BURNED",
              value: "tokensBurned",
              align: "right",
            },
            {
              label: "SHITPOINTS EARNED",
              value: "pointsEarned",
              align: "right",
            },
          ]}
          data={mockData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          pageSize={pageSize}
        />
      </div>
    </>
  );
};

export default Index;
