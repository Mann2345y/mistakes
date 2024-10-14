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
import useGenericQuery from "@/services/useGenericQuery";
import { API_ROUTES } from "@/services/routes";
import useGenericMutation from "@/services/useGenericMutation";
import { toast } from "react-toastify";

const Index = () => {
  const { setOpenModal, setModalType } = useModalContext();

  const { ocAuth } = useOCAuth();

  const { mutateAsync: unlinkWallet } = useGenericMutation({
    endpoint: API_ROUTES.UNLINK_WALLET,
    onSuccess: async () => {
      toast.success("Wallet linked successfully.");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  const eduUsername = useMemo(() => {
    return typeof ocAuth?.getAuthInfo === "function"
      ? ocAuth.getAuthInfo()?.edu_username ?? ""
      : "";
  }, [ocAuth]);

  interface WalletData {
    walletsLinked: { ocid: string }[];
  }

  const { data } = useGenericQuery<WalletData>(
    [API_ROUTES.GET_USER_WALLETS, eduUsername],
    API_ROUTES.GET_USER_WALLETS,
    {
      pathParams: { ocid: eduUsername },
      enabled: !!eduUsername,
    }
  );

  const userWallets = useMemo(() => {
    if (Object.keys(ocAuth).length === 0) return [];

    const accountDataLinkedToOCID = ocAuth.getAuthInfo();

    console.log({ data });

    const linkedWallets = data?.walletsLinked;

    console.log({ linkedWallets });

    const wallets =
      linkedWallets?.map((wallet: any) => {
        return { ocid: wallet, walletIcon: EthIcon };
      }) ?? [];

    return [
      { ocid: accountDataLinkedToOCID?.eth_address, walletIcon: EthIcon },
      ...wallets,
    ];
  }, [ocAuth, data]);

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
              <button
                className="border-b border-solid border-orange text-orange !font-bold text-sm"
                onClick={async () => {
                  const body = {
                    wallet: wallet.ocid,
                    ocid: ocAuth.getAuthInfo()?.edu_username,
                  };

                  await unlinkWallet(body);
                }}
              >
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
