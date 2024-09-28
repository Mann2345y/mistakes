import React, { useEffect, useRef, ReactNode } from "react";

interface ClickAwayListenerProps {
  children: ReactNode;
  onClickAway: () => void;
}

const ClickAwayListener: React.FC<ClickAwayListenerProps> = ({
  children,
  onClickAway,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClickAway();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickAway]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default ClickAwayListener;
