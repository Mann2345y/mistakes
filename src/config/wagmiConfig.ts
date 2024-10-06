import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, rainbowWallet } from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";

export const projectId = "56e6f71b07c118d74e17f87144f4380e";

export const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [rainbowWallet, metaMaskWallet],
    },
  ],
  {
    appName: "mistakes",
    projectId: projectId,
  }
);

export const wagmiConfig = createConfig({
  connectors,
  chains: [mainnet],
  transports: { [mainnet.id]: http() },
});
