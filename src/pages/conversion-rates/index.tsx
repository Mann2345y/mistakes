import { PriceChangeIcon, SearchIcon } from "@/components/Icons";
import Table from "@/components/Table/Table";
import { whiteBlockClasses } from "@/styles/commonClasses";
import React, { useEffect, useState } from "react";

type ConversionTableRows = {
  name: React.JSX.Element;
  tokenAddress: React.JSX.Element;
  tokenStandard: React.JSX.Element;
  conversionRate: React.JSX.Element;
};

const Index = () => {
  const [search, setSearch] = useState("");

  const generateData = () =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: [
        "Digital Gem",
        "EcoCoin",
        "ArtBlock",
        "TokenTree",
        "PixelPort",
        "Quantumbits",
        "LegacyLedger",
        "MysticMint",
        "EchoAsset",
        "CryptoCanvas",
      ][Math.floor(Math.random() * 10)],
      conversionRate: (Math.random() * 900 + 100).toFixed(2),
      tokenAddress: `0x${Math.floor(Math.random() * 1e16)
        .toString(16)
        .padStart(40, "0")}`,
      tokenStandard: ["ERC-20", "ERC-721", "ERC-1155"][
        Math.floor(Math.random() * 3)
      ],
      pricingChange: ["increased", "decreased"][Math.floor(Math.random() * 2)],
    }));

  const [data, setData] = useState<ConversionTableRows[]>([]);

  useEffect(() => {
    const dataArray = generateData();
    const tableRowsData = dataArray.map((row) => {
      return {
        name: <div className="!text-orange !font-bold">{row?.name}</div>,
        tokenAddress: <div className="!font-bold">{row?.tokenAddress}</div>,
        tokenStandard: (
          <div className="!font-bold !text-right">{row?.tokenStandard}</div>
        ),
        conversionRate: (
          <div className="!font-bold gap-3 flex items-center justify-end">
            <PriceChangeIcon
              size={21}
              className={
                row?.pricingChange === "increased"
                  ? "text-green rotate-0"
                  : "text-red rotate-180"
              }
            />

            {row?.conversionRate}
          </div>
        ),
      };
    });

    setData(tableRowsData);
  }, []);

  return (
    <>
      <div className={`${whiteBlockClasses}`}>
        <h4 className="text-lg font-black leading-[30px] mb-2">
          ASSET CONVERSION RATES
        </h4>
        <p className="font-semibold text-base leading-[25px]">
          Explore the conversion rate table below, which dynamically updates to
          show the rates for eligible tokens as they are recognized by the
          system. This tool helps you understand how many ShitPoints you can
          earn from each recognized digital asset in your portfolio.
        </p>
      </div>
      <div className="my-5 flex gap-4">
        <div
          className={`${whiteBlockClasses} relative flex gap-4 items-center max-w-72 !py-3 !px-4`}
        >
          <SearchIcon size={21} className="text-grey" />
          <input
            value={search}
            onChange={(e) => setSearch(e?.target?.value)}
            className={`focus:!outline-none`}
            placeholder="Search by name"
          />
        </div>
        <button
          className={`${whiteBlockClasses} font-bold text-base !w-24 !p-3 !bg-turqoise`}
        >
          Search
        </button>
      </div>
      <div className={`${whiteBlockClasses}`}>
        <Table
          headers={[
            { label: "Token Name", value: "name" },
            { label: "Contract Address", value: "tokenAddress" },
            { label: "Token Standard", value: "tokenStandard", align: "right" },
            {
              label: "Conversion Rate",
              value: "conversionRate",
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
