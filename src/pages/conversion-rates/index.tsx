import { PriceChangeIcon, SearchIcon } from "@/components/Icons";
import Table from "@/components/Table/Table";
import { whiteBlockClasses } from "@/styles/commonClasses";
import React, { useEffect, useState } from "react";
import { API_ROUTES } from "@/services/routes";
import useGenericQuery from "@/services/useGenericQuery";

type ConversionTableRows = {
  name: React.JSX.Element;
  tokenAddress: React.JSX.Element;
  tokenStandard: React.JSX.Element;
  conversionRate: React.JSX.Element;
};

type ConversionData = {
  contract_address: string;
  name: string;
  rate: string;
  prev_rate: string;
  type: string;
};

const Index = () => {
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGenericQuery(
    [API_ROUTES.GET_CONVERSION_RATE, pageSize.toString(), currentPage.toString()],
    API_ROUTES.GET_CONVERSION_RATE
  );

  const [tableData, setTableData] = useState<ConversionTableRows[]>([]);

  useEffect(() => {
    const dataArray = data ?? [];
    const tableRowsData = (dataArray as any[])?.map((row) => {
      return {
        name: <div className="!text-orange !font-bold">{row?.name}</div>,
        tokenAddress: <div className="!font-bold">{row?.contract_address}</div>,
        tokenStandard: (
          <div className="!font-bold !text-right">{row?.type}</div>
        ),
        conversionRate: (
          <div className="!font-bold gap-3 flex items-center justify-end">
            <PriceChangeIcon
              size={21}
              className={
                Number(row?.prev_rate) - Number(row?.rate) < 0
                  ? "text-green rotate-0"
                  : "text-red rotate-180"
              }
            />

            {row?.rate}
          </div>
        ),
      };
    });

    setTableData(tableRowsData);
  }, [data]);

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
          data={tableData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    </>
  );
};

export default Index;
