import { getWalletSigner } from "@/utils/getWalletEthersSigner";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useWalletClient } from "wagmi";
import { JsonRpcSigner } from "@ethersproject/providers";

type SignerContextType = JsonRpcSigner | null;

const SignerContext = createContext<SignerContextType>(null);

interface SignerProviderProps {
  children: ReactNode;
}

export const SignerProvider: React.FC<SignerProviderProps> = ({ children }) => {
  const [signer, setSigner] = useState<SignerContextType>(null);
  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    const fetchSigner = async () => {
      try {
        if (walletClient) {
          const walletSigner = (await getWalletSigner(
            walletClient
          )) as unknown as JsonRpcSigner;
          setSigner(walletSigner);
        }
      } catch (error) {
        console.error("Failed to get wallet signer:", error);
      }
    };

    fetchSigner();
  }, [walletClient]);

  return (
    <SignerContext.Provider value={signer}>{children}</SignerContext.Provider>
  );
};

export const useSigner = () => {
  return useContext(SignerContext);
};
