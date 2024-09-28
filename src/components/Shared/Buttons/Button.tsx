import React from "react";

interface ButtonProps {
  variant: "contained" | "outlined";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, children, ...props }) => {
  return (
    <button
      className="grow flex gap-4 min-h-16 items-center justify-center bg-black rounded-md font-nunito text-white font-semibold text-lg"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
