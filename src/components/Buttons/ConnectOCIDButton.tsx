import Image from "next/image";
import React from "react";
import OcLogoImage from "../../../public/images/ocLogoBig.png";
import { useOCAuth } from "@opencampus/ocid-connect-js";

const ConnectOCIDButton = () => {
  const { ocAuth } = useOCAuth();

  const handleLogin = async () => {
    try {
      await ocAuth.signInWithRedirect({ state: "opencampus" });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <button
      className="bg-black-2 rounded-full flex items-center justify-center gap-4 text-white font-medium font-nunito border-2 border-solid border-white px-8 py-3 cursor-pointer my-2"
      onClick={() => handleLogin()}
    >
      <Image
        src={OcLogoImage}
        className="h-9 w-9 object-contain"
        alt="oc logo"
      />
      <p>
        Connect <span className="font-bold">OCID</span>{" "}
      </p>
    </button>
  );
};

export default ConnectOCIDButton;
