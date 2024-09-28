import Button from "@/components/Shared/Buttons/Button";
import FireIcon from "../../../public/images/fireIcon.png";
import QRCodeImage from "../../../public/images/qrCode.png";
import Image from "next/image";
import Dropdown from "@/components/Shared/Dropdowns/Dropdown";
import { useState } from "react";

const Index = () => {
  const whiteBlockClasses =
    "w-full h-fit bg-white/85 rounded-xl border-[3px] border-solid border-black p-6 px-8 shadow-md font-nunito";

  const howItWorksBulletPoints = [
    "Safely link your digital wallet to start the process.",
    "Send your unwanted cryptocurrencies and NFTs to our designated burn address.",
    "Receive OC Points based on the value of the assets you burn.",
    "Use your OC Points to acquire EDULand NFTs, enabling node operation and network rewards on the EDU Chain.",
    "Monitor your earnings and rankings directly from your dashboard.",
  ];

  const [selectedChainForBurn, setSelectedChainForBurn] = useState("ethereum");

  return (
    <div className="flex gap-8 px-6 md:px-16 lg:px-36 grow pb-8 flex-col-reverse md:flex-row">
      <div className={`${whiteBlockClasses}`}>
        <h5 className="font-black text-[22px] mb-3">Overview</h5>
        <p className="font-bold text-base leading-6">
          “Learn from your Mistakes” (LFYM) is an innovative platform that
          transforms your underperforming digital assets into valuable
          educational opportunities. By sending your unused cryptocurrencies and
          NFTs to our unique burn address, you earn OC Points. These points can
          be exchanged for EDULand NFTs on the EDU Chain, empowering you to
          operate nodes and earn rewards. LFYM not only cleans your digital
          wallet but also paves the way for educational advancements through
          blockchain technology.
        </p>
        <h5 className="font-black text-[22px] my-6">HOW IT WORKS</h5>
        <div className="mb-6">
          {howItWorksBulletPoints.map((point, idx) => (
            <div className="flex gap-2 items-center mb-3" key={idx}>
              <div className="min-h-[10px] max-h-[10px] min-w-[10px] max-w-[10px] bg-orange rounded-full"></div>
              <p className="font-bold text-base leading-6">{point}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-6 flex-col md:flex-row">
          <Button variant="contained">Asset Conversion Rates</Button>
          <Button variant="contained">
            <span>BURN AND EARN NOW</span>
            <Image
              src={FireIcon}
              alt="#"
              className="h-8 w-auto object-contain "
            />
          </Button>
        </div>
      </div>
      <div className={`w-full md:min-w-[300px] md:max-w-[300px] h-fit grow`}>
        <div className={`${whiteBlockClasses} mb-6 flex flex-col items-start`}>
          <h3 className="text-orange text-4xl font-black">736, 203</h3>
          <p className="text-base font-semibold text-black">
            My ShitPoints Balance
          </p>
          <h4 className="text-orange font-extrabold text-[20px]">
            14 Sep - 14 Oct
          </h4>
          <p className="text-base font-semibold text-black">
            Current campaign period
          </p>
          <div className="h-[1px] w-full bg-black my-3"></div>
          <div className="my-2">
            <h5 className="font-extrabold text-[20px]">6, 392, 201</h5>
            <p className="font-semibold text-base">
              OC points up for distribution
            </p>
          </div>
          <div className="my-2">
            <h5 className="font-extrabold text-[20px]">3,328,381</h5>
            <p className="font-semibold text-base">NFTs burned</p>
          </div>
          <div className="my-2">
            <h5 className="font-extrabold text-[20px]">1, 049, 283</h5>
            <p className="font-semibold text-base">Fungible Tokens burned</p>
          </div>
          <div className="h-[1px] w-full bg-black my-3"></div>
          <p className="underline cursor-pointer text-orange text-base font-bold">
            View my recent activities
          </p>
        </div>
        <div className={`${whiteBlockClasses}`}>
          <h5 className="font-bold text-lg">Burn address</h5>
          <Dropdown
            options={[{ label: "Ethereum", value: "ethereum" }]}
            value={selectedChainForBurn}
            onChange={(e) => {
              setSelectedChainForBurn(e);
            }}
          />
          <Image
            src={QRCodeImage}
            alt="#"
            className="h-36 w-36 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
