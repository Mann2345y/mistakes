import { BrowserProvider } from "ethers";

interface Client {
  chain: {
    id: number;
    name: string;
    contracts?: {
      ensRegistry?: {
        address: string;
      };
    };
  };
  transport: any;
}

export async function clientToSigner(client: Client) {
  const { chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = await provider.getSigner();
  return signer;
}

export async function getWalletSigner(walletClient: Client) {
  if (!walletClient) {
    throw new Error("No wallet client available");
  }

  try {
    const signer = await clientToSigner(walletClient);
    return signer;
  } catch (error) {
    console.error("Error converting client to signer:", error);
    throw error;
  }
}
