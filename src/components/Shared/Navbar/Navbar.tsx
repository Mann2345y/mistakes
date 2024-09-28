import React, { useMemo, useState } from "react";
import LogoImage from "../../../../public/images/logo.png";
import OcLogo from "../../../../public/images/ocLogoSmall.png";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { DownIcon } from "../Icons";
import ClickAwayListener from "../ClickAwayListener";

const Navbar = () => {
  const [showUserOptions, setShowUserOptions] = useState(false);
  const router = useRouter();
  const { authState, ocAuth } = useOCAuth();

  console.log({ authState, ocAuth });

  const handleLogin = async () => {
    try {
      await ocAuth.signInWithRedirect({ state: "opencampus" });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const navLinks = useMemo(
    () => [
      {
        label: "Dashboard",
        href: "/dashboard",
        active: router.asPath === "/dashboard",
      },
      {
        label: "My Wallets",
        href: "/wallets",
        active: router.asPath.includes("wallets"),
      },
      {
        label: "Burn",
        href: "/burn",
        active: router.asPath.includes("burn"),
      },
      {
        label: "Leaderboard",
        href: "/leaderboard",
        active: router.asPath.includes("leaderboard"),
      },
    ],
    [router]
  );

  return (
    <div className="h-fit px-16 py-6 w-full flex items-center justify-between bg-black-3 md:bg-transparent">
      <div className="h-fit flex flex-col items-start gap-1 font-poppins text-[9px] font-medium  text-center text-black">
        <p className="leading-[14.6px] tracking-[0.57em]">LEARN FROM YOUR</p>
        <Image src={LogoImage} alt="#" className="h-12 w-auto object-contain" />
        <div className="w-fit flex gap-1">
          <p className="font-medium">A dApp by</p>
          <Image src={OcLogo} alt="#" className="h-4 w-4 object-contain" />
          <p className="font-bold">Open Campus</p>
        </div>
      </div>
      {router?.pathname !== "/" && (
        <div className="h-fit flex gap-8 p-4 bg-turqoise font-nunito border-2 border-solid border-black rounded-2xl">
          {navLinks.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className={`cursor-pointer text-sm tracking-wide text-black uppercase ${
                link.active ? "font-black" : "font-bold"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {authState.isAuthenticated ? (
            <ClickAwayListener onClickAway={() => setShowUserOptions(false)}>
              <div className="relative">
                <p
                  className="cursor-pointer text-sm text-black font-bold flex gap-2 items-center"
                  onClick={() => setShowUserOptions(true)}
                >
                  {ocAuth.getAuthInfo()?.edu_username}
                  <span>
                    <DownIcon size={14} color="#000a" />
                  </span>
                </p>

                <div
                  className={`origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg text-white bg-white ring-1 ring-white ring-opacity-5 transition-all duration-300 ease-in-out transform ${
                    showUserOptions
                      ? "scale-y-100 opacity-100"
                      : "scale-y-0 opacity-0"
                  }`}
                >
                  <p
                    className="font-semibold text-black rounded-md cursor-pointer hover:bg-gray-300 p-4 transition-all duration-300"
                    onClick={() => {
                      localStorage.clear();
                      window.open("/", "_self");
                      setShowUserOptions(false);
                    }}
                  >
                    Logout
                  </p>
                </div>
              </div>
            </ClickAwayListener>
          ) : (
            <p
              className="cursor-pointer text-sm text-black font-bold underline"
              onClick={handleLogin}
            >
              Connect OCID
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
