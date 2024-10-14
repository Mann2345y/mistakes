"use client";

import { API_ROUTES } from "@/services/routes";
import useGenericMutation from "@/services/useGenericMutation";
import { LoginCallBack, useOCAuth } from "@opencampus/ocid-connect-js";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function RedirectPage() {
  const router = useRouter();

  // const { mutateAsync: addWalletInOCID } = useGenericMutation({
  //   endpoint: API_ROUTES.ADD_WALLET,
  //   onSuccess: async () => {
  //     router.push("/dashboard");
  //   },
  //   onError: () => {
  //     router.push("/");
  //     toast.error("Something went wrong. Please try again.");
  //   },
  // });

  const loginSuccess = () => {
    router.push("/dashboard");
  };

  const loginError = (error: any) => {
    console.error("Login error:", error);
  };

  function CustomErrorComponent() {
    const { authState } = useOCAuth();
    return <></>;
  }

  function CustomLoadingComponent() {
    return <></>;
  }

  return (
    <LoginCallBack
      errorCallback={loginError}
      successCallback={loginSuccess}
      customErrorComponent={<CustomErrorComponent />}
      customLoadingComponent={<CustomLoadingComponent />}
    />
  );
}
