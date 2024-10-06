import React from "react";

interface ButtonProps {
  variant: "contained" | "outlined";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  className,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`grow flex gap-4 h-fit py-3 px-6 items-center justify-center border-2 border-solid rounded-md font-nunito text-white font-semibold text-lg ${
        variant === "contained"
          ? "bg-black border-black"
          : variant === "outlined"
          ? "border-black text-black bg-transparent"
          : ""
      } ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
