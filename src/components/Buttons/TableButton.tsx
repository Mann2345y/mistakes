import React, { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface TableButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isActive?: boolean;
}

const TableButton: FC<TableButtonProps> = ({
  children,
  className,
  isActive,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`border-2 border-solid border-black min-h-[2rem] max-h-[2rem] min-w-[2rem] max-w-[2rem] flex items-center justify-center text-xs font-bold text-black rounded-md cursor-pointer ${
        isActive ? "bg-turqoise" : "bg-white"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default TableButton;
