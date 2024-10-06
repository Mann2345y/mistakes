import {
  createContext,
  useContext, // Add useContext for the custom hook
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface ModalContextProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  modalType: string;
  setModalType: Dispatch<SetStateAction<string>>;
  modalData: Record<string, any>;
  setModalData: Dispatch<SetStateAction<Record<string, any>>>;
}

// Initialize context
export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined
);

interface ModalContextWrapperProps {
  children: ReactNode;
}

const ModalContextWrapper: React.FC<ModalContextWrapperProps> = ({
  children,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!openModal) {
      setModalType("");
    }
  }, [openModal]);

  return (
    <ModalContext.Provider
      value={{
        openModal,
        setOpenModal,
        modalData,
        setModalData,
        modalType,
        setModalType,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to use ModalContext safely
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "useModalContext must be used within a ModalContextWrapper"
    );
  }
  return context;
};

export default ModalContextWrapper;
