import React, { useState } from "react";
import { NextPageIcon, PreviousPageIcon } from "../Icons";
import TableButton from "@/components/Buttons/TableButton";

interface TableProps {
  headers: { label: string; value: string; align?: string }[];
  data: { [key: string]: JSX.Element }[];
  pageSize: number;
  currentPage: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Table: React.FC<TableProps> = ({
  headers,
  data,
  pageSize,
  currentPage,
  setPageSize,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(data?.length / pageSize);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const paginatedData = data?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const emptyRows = pageSize - paginatedData?.length;

  return (
    <div className="overflow-x-auto !font-inter">
      <table className="w-full border-collapse table-auto min-w-[800px]">
        <thead className="mb-16">
          <tr>
            {headers?.map((header, index) => (
              <th
                key={index}
                className={`${
                  header?.align === "right" ? "text-right" : "text-left"
                } text-xs uppercase font-bold text-black`}
              >
                {header?.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-transparent">
          {paginatedData?.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-solid border-black">
              {headers?.map((header, cellIndex) => {
                const cellValue = row[header?.value as keyof typeof row];

                return (
                  <td
                    key={cellIndex}
                    className="font-semibold text-black py-6 "
                  >
                    {cellValue}
                  </td>
                );
              })}
            </tr>
          ))}
          {Array.from({ length: emptyRows }).map((_, index) => (
            <tr key={`empty-${index}`} className="">
              {headers.map((_, cellIndex) => (
                <td key={cellIndex} className="py-6">
                  &nbsp;
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end gap-3 items-center mt-4">
        <TableButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <PreviousPageIcon size={14} />
        </TableButton>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const page =
            currentPage <= 3
              ? i + 1
              : Math.min(
                  Math.max(currentPage - 2 + i, 1),
                  totalPages - 5 + i + 1
                );

          return (
            <TableButton
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={page > totalPages}
              isActive={page === currentPage}
            >
              {page}
            </TableButton>
          );
        })}

        <TableButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <NextPageIcon size={14} />
        </TableButton>
      </div>
    </div>
  );
};

export default Table;
