// GlobalDataContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { setUserAxiosToken } from "../api/client/axiosUser";
import { setVendorAxiosToken } from "../api/client/axiosVendor";
import { clear, load, save } from "../utils/authStorage";

// =========================
// Types
// =========================

export interface UserDataType {
  id: number | null;
  profileId: number | null;
}

export interface VendorDataType {
  id: number | null;
  profileId: number | null;
}

interface GlobalDataContextType {
  userToken: string | null;
  vendorToken: string | null;

  userData: UserDataType;
  vendorData: VendorDataType;

  initialized: boolean;

  setUserToken: (token: string | null) => Promise<void>;
  setVendorToken: (token: string | null) => Promise<void>;

  setUserData: (data: Partial<UserDataType>) => void;
  setVendorData: (data: Partial<VendorDataType>) => void;

  logout: () => Promise<void>;
  roleMode: "farmer" | "supplier";
  updateRoleMode: (mode: "farmer" | "supplier") => Promise<void>;
}

const GlobalDataContext = createContext<GlobalDataContextType | undefined>(
  undefined
);

export const GlobalDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userToken, setUserTokenState] = useState<string | null>(null);
  const [vendorToken, setVendorTokenState] = useState<string | null>(null);
  const [roleMode, setRoleMode] = useState<"farmer" | "supplier">("farmer");

  const [userData, setUserDataState] = useState<UserDataType>({
    id: null,
    profileId: null,
  });

  const [vendorData, setVendorDataState] = useState<VendorDataType>({
    id: null,
    profileId: null,
  });

  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    (async () => {
      const storedRole = await load("role_mode");
      if (storedRole === "supplier" || storedRole === "farmer") {
        setRoleMode(storedRole);
      }
    })();
  }, []);

  // =========================
  // Load from storage on app start
  // =========================
  useEffect(() => {
    (async () => {
      const uTok = await load("user_token");
      const vTok = await load("vendor_token");

      if (uTok) {
        setUserTokenState(uTok);
        setUserAxiosToken(uTok);
      }

      if (vTok) {
        setVendorTokenState(vTok);
        setVendorAxiosToken(vTok);
      }

      setInitialized(true);
    })();
  }, []);

  // =========================
  // Set User Token
  // =========================

  const updateRoleMode = async (mode: "farmer" | "supplier") => {
    setRoleMode(mode);
    await save("role_mode", mode);
  };

  const setUserToken = async (token: string | null) => {
    if (token) await save("user_token", token);
    else await clear("user_token");

    setUserTokenState(token);
    setUserAxiosToken(token);

    if (!token) setUserDataState({ id: null, profileId: null });
  };

  // =========================
  // Set Vendor Token
  // =========================
  const setVendorToken = async (token: string | null) => {
    if (token) await save("vendor_token", token);
    else await clear("vendor_token");

    setVendorTokenState(token);
    setVendorAxiosToken(token);

    if (!token) setVendorDataState({ id: null, profileId: null });
  };

  // =========================
  // Merge User Data
  // =========================
  const setUserData = (data: Partial<UserDataType>) => {
    setUserDataState((prev) => ({ ...prev, ...data }));
  };

  // =========================
  // Merge Vendor Data
  // =========================
  const setVendorData = (data: Partial<VendorDataType>) => {
    setVendorDataState((prev) => ({ ...prev, ...data }));
  };

  // =========================
  // Logout (clears both)
  // =========================
  const logout = async () => {
    await setUserToken(null);
    await setVendorToken(null);
  };

  return (
    <GlobalDataContext.Provider
      value={{
        userToken,
        vendorToken,

        userData,
        vendorData,

        initialized,

        setUserToken,
        setVendorToken,
        setUserData,
        setVendorData,
        logout,
        roleMode,
        updateRoleMode,
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};

// =========================
// Export Hook
// =========================
export const useGlobalData = (): GlobalDataContextType => {
  const ctx = useContext(GlobalDataContext);
  if (!ctx)
    throw new Error("useGlobalData must be used within GlobalDataProvider");

  return ctx;
};
