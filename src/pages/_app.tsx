import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainWrapper from "@/components/Shared/MainWrapper";
import { OCConnect } from "@opencampus/ocid-connect-js";

export default function App({ Component, pageProps }: AppProps) {
  const options = {
    redirectUri:
      process.env.NEXT_PUBLIC_REDIRECT_URI ?? "http://localhost:3000",
    referralCode: "PARTNER6",
  };

  return (
    <OCConnect opts={options} sandboxMode={true}>
      <MainWrapper>
        <Component {...pageProps} />
      </MainWrapper>
    </OCConnect>
  );
}
