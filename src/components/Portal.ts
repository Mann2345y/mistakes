import { ReactNode, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

interface ReactPortalProps {
  children: ReactNode;
  wrapperId: string;
}

const ReactPortal: React.FC<ReactPortalProps> = ({
  children,
  wrapperId,
}: ReactPortalProps): JSX.Element | null => {
  const [wrapper, setWrapper] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let created = false;

    if (!element) {
      created = true;
      const wrapper = document.createElement("div");
      wrapper.setAttribute("id", wrapperId);
      wrapper.setAttribute(
        "class",
        "w-screen fixed top-0 left-0 element-full-height z-[1001]"
      );
      document.body.appendChild(wrapper);
      element = wrapper;
    }
    setWrapper(element);

    return () => {
      if (created && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (wrapper === null) return null;

  return createPortal(children, wrapper);
};

export default ReactPortal;
