import AddWalletModal from "@/components/Modals/AddWalletModal/AddWalletModal";
import { PlusIcon } from "@/components/Icons";
import { useModalContext } from "@/context/ModalContext";
import { whiteBlockClasses } from "@/styles/commonClasses";
import Link from "next/link";
import React, { useMemo } from "react";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import EthIcon from "../../../public/images/ethereumIcon.png";
import Image from "next/image";
import "@rainbow-me/rainbowkit/styles.css";
import { useAccount } from "wagmi";

const Index = () => {
  const { setOpenModal, setModalType } = useModalContext();

  const { authState, ocAuth } = useOCAuth();

  const userWallets = useMemo(() => {
    if (Object.keys(ocAuth).length === 0) return [];

    const accountDataLinkedToOCID = ocAuth.getAuthInfo();

    return [
      { ocid: accountDataLinkedToOCID?.eth_address, walletIcon: EthIcon },
    ];
  }, [ocAuth]);

  const { address } = useAccount();

  return (
    <>
      <div className="flex items-start justify-center gap-16">
        <div className={`${whiteBlockClasses} !max-w-[400px] !font-inter`}>
          <div className="flex justify-between mb-4">
            <h5 className="font-black text-lg !font-nunito">MY WALLETS</h5>
            <div
              className="flex items-center gap-1 text-sm !text-orange border-b border-solid border-orange font-bold cursor-pointer"
              onClick={() => {
                setModalType("addWallet");
                setOpenModal(true);
              }}
            >
              <PlusIcon size={14} className="" />
              <p className="!font-inter">Link new wallet</p>
            </div>
          </div>
          {userWallets?.map((wallet, index) => (
            <div className="flex items-center justify-between my-3" key={index}>
              <div className="flex gap-2 items-center">
                <Image
                  src={wallet?.walletIcon}
                  height={32}
                  width={32}
                  alt="#"
                />
                <p className="!font-semibold text-sm">
                  {wallet?.ocid?.slice(0, 6)}.....{wallet?.ocid?.slice(-6)}
                </p>
              </div>
              <button className="border-b border-solid border-orange text-orange !font-bold text-sm">
                Unlink
              </button>
            </div>
          ))}
        </div>
        <div className={`${whiteBlockClasses} !max-w-64`}>
          <h3 className="font-black text-4xl mb-2">736,203</h3>
          <p className="mt-2 mb-6">My Shitpoints balance</p>
          <Link
            href={"/recent-activities"}
            className="font-bold text-orange text-base underline "
          >
            View my recent activities
          </Link>
        </div>
      </div>
      <AddWalletModal />
    </>
  );
};

export default Index;
