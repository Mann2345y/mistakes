import React, { ReactNode } from "react";
import HeroImageBig from "../../public/images/herobg.png";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import { Inter, Nunito, Permanent_Marker, Poppins } from "next/font/google";
import { axiosInstance } from "@/services/axios";

type MainWrapperProps = {
  children: ReactNode;
};

const inter = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
});
const nunito = Nunito({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-nunito",
});
const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-permanentMarker",
});
const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const MainWrapper: React.FC<MainWrapperProps> = ({ children }) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <div
      className={`${inter.variable} ${nunito.variable} ${permanentMarker.variable} ${poppins.variable}`}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={HeroImageBig}
          className="w-full h-full object-fill"
          alt="Hero Background"
        />
      </div>
      <div className="flex flex-col h-screen w-screen relative overflow-x-hidden overflow-y-auto z-10">
        <Navbar />
        <div className="flex flex-col grow px-16 pb-24">{children}</div>
      </div>
    </div>
  );
};

export default MainWrapper;
