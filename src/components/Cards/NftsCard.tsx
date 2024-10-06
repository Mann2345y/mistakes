import { whiteBlockClasses } from "@/styles/commonClasses";
import Image from "next/image";
import React from "react";
import { CheckIcon } from "@/components/Icons";

const NftsCard = ({ data, clickHandler, isCardSelected }) => {
  return (
    <div
      className={`${whiteBlockClasses} h-full !p-4 relative`}
      onClick={() => clickHandler(data)}
    >
      <div
        className={`absolute right-8 top-8 cursor-pointer z-[1000] h-5 w-5 border-2 border-solid rounded-full ${
          isCardSelected
            ? "bg-orange border-orange"
            : "bg-white/30 border-white"
        }`}
      >
        {isCardSelected && <CheckIcon />}
      </div>
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data?.nftImage}
          alt={data?.tokenName}
          className="h-56 w-full object-cover rounded-lg border-[3px] border-solid border-black"
        />
        {isCardSelected && (
          <div className="absolute inset-0 bg-white/60 rounded-lg"></div>
        )}
      </div>
      <h5 className="font-extrabold text-base text-black mt-2">
        {data?.tokenName}
      </h5>
      <p className="font-semibold text-sm text-black/50 mb-1">
        {data?.collectionName}
      </p>
    </div>
  );
};

export default NftsCard;
