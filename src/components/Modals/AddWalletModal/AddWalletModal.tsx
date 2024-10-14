import React, { useState, useRef } from "react";
import Modal from "@/components/Modals/Modal";
import { whiteBlockClasses } from "@/styles/commonClasses";
import Button from "@/components/Buttons/Button";
import { useModalContext } from "@/context/ModalContext";
import useGenericMutation from "@/services/useGenericMutation";
import { API_ROUTES } from "@/services/routes";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { ConnectButton2 } from "@/components/Buttons/ConnectButton";
import { useAccount } from "wagmi";
import { useSigner } from "@/context/SignerContext";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { toast } from "react-toastify";

const AddWalletModal = () => {
  const [enteredWalletAddress, setEnteredWalletAddress] = useState("");

  const { setOpenModal, modalType, openModal, setModalType } =
    useModalContext();

  const signer = useSigner();

  const { address } = useAccount();

  const { authState, ocAuth } = useOCAuth();

  const { mutateAsync: addWalletInOCID } = useGenericMutation({
    endpoint: API_ROUTES.ADD_WALLET,
    onSuccess: async () => {
      setModalType("");
      setOpenModal(false);
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  const checkToken = async () => {
    try {
      if (signer) {
        const signedMessage = await signer.signMessage("login");
        toast.loading("Adding wallet in OCID. Please wait...");
        const body = {
          wallet: address,
          message: "login",
          signature: signedMessage,
          ocid: ocAuth.getAuthInfo()?.edu_username,
        };

        await addWalletInOCID(body);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <Modal
      open={openModal && modalType === "addWallet"}
      handleClose={() => {
        setModalType("");
        setOpenModal(false);
      }}
    >
      <div
        className={`${whiteBlockClasses} min-w-[450px] max-w-[450px] flex items-start flex-col`}
      >
        <h5 className="text-lg font-black">ADD WALLET</h5>
        <div className="mt-3 mb-6 !font-inter text-xs font-medium flex flex-col items-start w-full gap-1">
          <p>Enter wallet address</p>
          <input
            type="text"
            className="w-full rounded bg-transparent-black border border-solid border-transparent-black-2 text-black placeholder:!text-gray-400 font-medium text-xs focus:outline-none p-2"
            placeholder="Example : 0xD318d14a1C9efBf7bC1C56E39B61C0dd66b7c2ef"
            value={enteredWalletAddress}
            onChange={(e) => setEnteredWalletAddress(e.target.value)}
          />
          {enteredWalletAddress?.length ===
          "0xD318d14a1C9efBf7bC1C56E39B61C0dd66b7c2ef"?.length ? (
            address === enteredWalletAddress ? (
              <p className="text-green my-2 font-semibold">
                Wallet connected successfully. Please sign a message in your
                wallet to verify your ownership
              </p>
            ) : (
              <p className="text-red my-2 font-semibold">
                Connected wallet address does not match the entered wallet
                address
              </p>
            )
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-end w-full">
          {enteredWalletAddress?.length ===
          "0xD318d14a1C9efBf7bC1C56E39B61C0dd66b7c2ef"?.length ? (
            <>
              {address === enteredWalletAddress ? (
                <>
                  <Button
                    variant="contained"
                    className="max-w-fit !text-base"
                    onClick={async () => {
                      await checkToken();
                    }}
                  >
                    Sign message
                  </Button>
                </>
              ) : (
                <>
                  <ConnectButton2 />
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddWalletModal;
