"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export const ConnectButton2 = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="grow flex gap-4 h-fit py-3 px-6 items-center justify-center border-2 border-solid rounded-md font-nunito text-white bg-black font-semibold text-base"
                  >
                    Connect
                  </button>
                );
              }

              return (
                <div>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="grow flex gap-4 h-fit py-3 px-6 items-center justify-center border-2 border-solid rounded-md font-nunito text-white bg-black font-semibold text-base"
                  >
                    Re-Connect Wallet
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
