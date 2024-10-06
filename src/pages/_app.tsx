import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainWrapper from "@/components/MainWrapper";
import { OCConnect } from "@opencampus/ocid-connect-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ModalContextWrapper from "@/context/ModalContext";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { OKXWalletAdapter } from "@/utils/OKXWalletAdapter";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/config/wagmiConfig";
import { SignerProvider } from "@/context/SignerContext";
import { mainnet } from "viem/chains";

export const queryClient = new QueryClient();

const appInfo = {
  appName: "mistakes",
};

export default function App({ Component, pageProps }: AppProps) {
  const options = {
    redirectUri:
      process.env.NEXT_PUBLIC_REDIRECT_URI ?? "http://localhost:3000/redirect",
    referralCode: "PARTNER6",
  };

  const solNetwork = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
  const wallets = useMemo(() => [new OKXWalletAdapter()], []);

  return (
    <OCConnect opts={options} sandboxMode={true}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            <WagmiProvider config={wagmiConfig}>
              <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                  modalSize="compact"
                  appInfo={appInfo}
                  theme={darkTheme({
                    accentColor: "#30b750",
                    accentColorForeground: "black",
                    borderRadius: "small",
                    fontStack: "system",
                    overlayBlur: "small",
                  })}
                  initialChain={mainnet}
                >
                  <SignerProvider>
                    <ModalContextWrapper>
                      <MainWrapper>
                        <Component {...pageProps} />
                      </MainWrapper>
                    </ModalContextWrapper>
                  </SignerProvider>
                </RainbowKitProvider>
              </QueryClientProvider>
            </WagmiProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </OCConnect>
  );
}
