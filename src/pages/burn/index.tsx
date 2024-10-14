import Button from "@/components/Buttons/Button";
import NftsCard from "@/components/Cards/NftsCard";
import Dropdown from "@/components/Dropdowns/Dropdown";
import { FilterIcon, SearchIcon } from "@/components/Icons";
import { whiteBlockClasses } from "@/styles/commonClasses";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import FireIcon from "../../../public/images/fireIcon.png";
import { formatNumberIndian } from "@/utils/helperFuncs";
import useGenericQuery from "@/services/useGenericQuery";
import { API_ROUTES } from "@/services/routes";
import { useAccount } from "wagmi";

interface NftData {
  id: number;
  nftImage: string;
  tokenName: string;
  collectionName: string;
  shitPoints: number;
}

const Index = () => {
  const [selectedChain, setSelectedChain] = useState("ethereum");
  const [activeTab, setActiveTab] = useState("nft");
  const [search, setSearch] = useState("");

  const [selectedNfts, setSelectedNfts] = useState<NftData[]>([]);

  const { address } = useAccount();

  const walletAddress = useMemo(() => {
    return address ?? "";
  }, [address]);

  const { data } = useGenericQuery(
    [API_ROUTES.GET_ASSETS, walletAddress],
    `${API_ROUTES.GET_ASSETS}`,
    {
      enabled: !!address,
      pathParams: { chainId: "656476", walletAddress },
    }
  );

  console.log({ data });

  const generateData = () =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      nftImage: [
        "https://www.nftgators.com/wp-content/uploads/2021/12/phayc-1024x682.png",
        "https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png",
        "https://i.seadn.io/gae/rhMy-A1ZvnUfgV6fuJ8ClD4EuawwPuTaAXjdR4jauTQHZKSd_edkvocZs3j2X86t2vCD7GhWKd831u-8lXUK9WbOSzPev9J03dYk?auto=format&dpr=1&w=1000",
        "https://i.seadn.io/gae/_Li9d-I8tHV30UpY-C8KEfcBPaSMB4dxlvxoFlsWW8ELX5e5c8RsskOYR1qGMmLZjilT_B7h4uzekVFJJudPUHkER--u2FVtQx_-fmQ?auto=format&dpr=1&w=1000",
        "https://i.seadn.io/gcs/files/43a5c585b49e808ca71eb9d42e725d31.png?auto=format&dpr=1&w=1000",
      ][Math.floor(Math.random() * 5)],
      tokenName: [
        "CryptoPunk",
        "Bored Ape Yacht Club",
        "Art Blocks",
        "Pudgy Penguins",
        "Cool Cats",
      ][Math.floor(Math.random() * 5)],
      collectionName: [
        "CryptoPunk",
        "Bored Ape Yacht Club",
        "Art Blocks",
        "Pudgy Penguins",
        "Cool Cats",
      ][Math.floor(Math.random() * 5)],
      shitPoints: Math.floor(Math.random() * 10000),
    }));

  const [mockData, setMockData] = useState<NftData[]>([]);

  useEffect(() => {
    setMockData(generateData());
  }, []);

  const toggleNftSelection = (nft: NftData) => {
    setSelectedNfts((prevSelectedNfts) => {
      const isSelected = prevSelectedNfts.some(
        (selectedNft) => selectedNft.id === nft.id
      );
      if (isSelected) {
        return prevSelectedNfts.filter(
          (selectedNft) => selectedNft.id !== nft.id
        );
      } else {
        return [...prevSelectedNfts, nft];
      }
    });
  };

  return (
    <>
      <div className="flex w-full gap-8 !font-nunito ">
        <div className={`${whiteBlockClasses} !max-w-72 h-[185px]`}>
          <h3 className="font-black text-4xl mb-2">736,203</h3>
          <p className="mt-2 mb-6">My Shitpoints balance</p>
          <Link
            href={"/recent-activities"}
            className="font-bold text-orange text-base underline "
          >
            View my recent activities
          </Link>
        </div>
        <div className={`${whiteBlockClasses} h-[185px]`}>
          <h5 className="font-black text-lg">HOW IT WORKS</h5>
          <p className="text-sm font-semibold mt-3">
            Transform your digital trash into treasure with “Learn from your
            Mistakes” (LFYM)! Connect your wallet, send your worthless digital
            assets to our burn address, and earn OC Points. Redeem these points
            for valuable EDULand NFTs on the EDU Chain, unlocking opportunities
            to operate nodes and earn rewards. Start cleaning your digital
            wallet and invest in your future education now!{" "}
            <a href="#" className="text-orange underline">
              Learn more
            </a>
          </p>
        </div>
      </div>
      <div className={`${whiteBlockClasses} mt-8`}>
        <div className="flex items-center justify-between !font-semibold">
          <h5 className="font-black">YOUR ASSETS</h5>
          <div className="flex gap-2">
            <Dropdown
              variant="outlined"
              options={[
                { label: "Ethereum", value: "ethereum" },
                { label: "Solana", value: "solana" },
              ]}
              value={selectedChain}
              onChange={() => {
                setSelectedChain(
                  selectedChain === "ethereum" ? "solana" : "ethereum"
                );
              }}
            />
            <div
              className={`${whiteBlockClasses} !px-4 !py-2 !rounded-md !min-h-12 !border-2 !max-h-12`}
            >
              0x7j....9k3n
            </div>
          </div>
        </div>
        <div className="w-full flex my-3 justify-between items-center">
          <div className="flex gap-4">
            <div
              className={`border-b-2 border-solid py-1 px-3 cursor-pointer transition-all duration-300 ${
                activeTab === "nft"
                  ? "border-orange font-bold text-orange"
                  : "text-black font-medium border-grey-2"
              }`}
              onClick={() => setActiveTab("nft")}
            >
              NFT
            </div>
            <div
              className={`border-b-2 border-solid py-1 px-3 cursor-pointer transition-all duration-300 ${
                activeTab === "fungibleToken"
                  ? "border-orange font-bold text-orange"
                  : "text-black font-medium border-grey-2"
              }`}
              onClick={() => setActiveTab("fungibleToken")}
            >
              {" "}
              Fungible Token
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <p>
              {selectedNfts?.length <= 0
                ? "None Selected"
                : `Selected : ${selectedNfts?.length}`}
            </p>
            <div className="w-[2px] h-4 bg-black"></div>
            <button
              className="text-orange underline font-medium text-sm"
              onClick={() => {
                setSelectedNfts(mockData);
              }}
            >
              Select all
            </button>
          </div>
        </div>
        <div className="my-5 flex justify-between items-end">
          <div className="flex gap-4">
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
          <div
            className={`${whiteBlockClasses} flex !max-w-28 !font-bold gap-3 !rounded-md items-center !px-4 !py-2`}
          >
            <FilterIcon size={21} className="text-black" />
            <p>Filter</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {mockData.map((data, index) => (
            <NftsCard
              data={data}
              key={index}
              clickHandler={toggleNftSelection}
              isCardSelected={selectedNfts?.some((el) => el?.id === data?.id)}
            />
          ))}
        </div>
      </div>
      <div className="my-8 w-full flex items-center justify-center gap-6 flex-col">
        <h5 className="font-bold text-2xl">
          All transactions are final and can not be reversed.
        </h5>
        <Button variant="contained">
          <p className="font-extrabold">
            BURN SELECTED
            <span className="font-semibold ml-1">
              (
              {formatNumberIndian(
                selectedNfts.reduce((acc, nft) => acc + nft.shitPoints, 0)
              )}{" "}
              ShitPoints)
            </span>
          </p>
          <Image
            src={FireIcon}
            alt="#"
            className="h-8 w-auto object-contain "
          />{" "}
        </Button>
        <Link
          href="/conversion-rates"
          className="underline font-bold text-base"
        >
          View current conversion rates
        </Link>
      </div>
    </>
  );
};

export default Index;
