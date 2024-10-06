import React, { useMemo, useState } from "react";
import ClickAwayListener from "@/components/ClickAwayListener";
import { AngleDownIcon, DownIcon } from "../Icons";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  variant?: "default" | "outlined";
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  variant = "default",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  const buttonClassNames = `inline-flex justify-between items-center w-full rounded-md border-2 h-12 text-sm font-medium shadow-sm px-4 py-2 focus:outline-none ${
    variant === "outlined"
      ? "border-black bg-white text-black"
      : "border-gray-300 bg-black text-white"
  }`;

  const menuClassNames = `origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg ring-1 ring-opacity-5 transition-all duration-300 ease-in-out transform ${
    variant === "outlined"
      ? "border-black bg-white text-black ring-black"
      : "bg-black text-white ring-black"
  } ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`;

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <div className="relative">
        <div>
          <button
            type="button"
            className={buttonClassNames}
            onClick={toggleDropdown}
          >
            {selectedOption ? selectedOption.label : "Select an option"}
            <AngleDownIcon
              size={14}
              className={`transition-all duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>

        <div className={menuClassNames}>
          <div className="py-1">
            {options.map((option) => (
              <a
                key={option.value}
                href="#"
                className="block px-4 py-2 text-sm"
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default Dropdown;
