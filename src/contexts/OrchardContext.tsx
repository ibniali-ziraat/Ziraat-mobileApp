import { createContext, useContext, useState } from "react";

interface OrchardContextType {
  orchardId: number | null;
  setOrchardId: (id: number | null) => void;
  resetOrchard: () => void;
}

const OrchardContext = createContext<OrchardContextType>(
  {} as OrchardContextType
);

export const OrchardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [orchardId, setOrchardIdState] = useState<number | null>(null);

  const setOrchardId = (id: number | null) => {
    setOrchardIdState(id);
  };

  const resetOrchard = () => {
    setOrchardIdState(null);
  };

  return (
    <OrchardContext.Provider
      value={{
        orchardId,
        setOrchardId,
        resetOrchard,
      }}
    >
      {children}
    </OrchardContext.Provider>
  );
};

export const useOrchard = () => {
  const ctx = useContext(OrchardContext);
  if (!ctx) {
    throw new Error("useOrchard must be used within OrchardProvider");
  }
  return ctx;
};
