import ConnectOCIDButton from "@/components/Shared/Buttons/ConnectOCIDButton";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { authState } = useOCAuth();
  const router = useRouter();

  useEffect(() => {
    if (authState.isAuthenticated) {
      router.push("/dashboard");
    }
  }, [authState, router]);

  return (
    <main className="flex items-center justify-center flex-col">
      <h1 className="h-fit w-full flex items-center justify-center font-permanentMarker text-5xl leading-[80px]">
        Turn Digital Trash into Treasure
      </h1>
      <ConnectOCIDButton />
      <p className="font-nunito text-black font-bold text-2xl mt-2">
        Start by connecting your OCID
      </p>
    </main>
  );
}
