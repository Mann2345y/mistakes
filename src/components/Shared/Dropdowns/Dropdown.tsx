import React, { useMemo, useState } from "react";
import ClickAwayListener from "@/components/Shared/ClickAwayListener";
import { AngleDownIcon, DownIcon } from "../Icons";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange }) => {
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

  console.log({ selectedOption });

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <div className="relative">
        <div>
          <button
            type="button"
            className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 text-white shadow-sm px-4 py-2 bg-black text-sm font-medium  focus:outline-none"
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

        <div
          className={`origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg text-white bg-black ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out transform ${
            isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          }`}
        >
          <div className="py-1">
            {options.map((option) => (
              <a
                key={option.value}
                href="#"
                className="block px-4 py-2 text-sm "
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
