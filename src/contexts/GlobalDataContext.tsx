import React, { createContext, useContext, useEffect, useState } from "react";
import { setUserAxiosToken } from "../api/client/axiosUser";
import { save, load, clear } from "../utils/authStorage";

// =========================
// Types
// =========================
export interface UserDataType {
  id: number | null;
  profileId: number | null;
}export interface VendorDataType {
  vendorData: number | null;
  profileId: number | null;
}

interface GlobalDataContextType {
  userToken: string | null;
  userData: UserDataType;
  initialized: boolean;

  setUserToken: (token: string | null) => Promise<void>;
  setUserData: (data: Partial<UserDataType>) => void;
  setVendorData: (data: Partial<VendorDataType>) => void;
  vendorData: VendorDataType

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
  const [userData, setUserDataState] = useState<UserDataType>({
    id: null,
    profileId: null,
  });
  const [vendorData, setVendorDataState] = useState<VendorDataType>({
    id: null,
    profileId: null,
  });

  const [roleMode, setRoleMode] = useState<"farmer" | "supplier">("farmer");
  const [initialized, setInitialized] = useState(false);

  // Load token, userId, profileId, roleMode on app start
  useEffect(() => {
    (async () => {
      const uTok = await load("user_token");
      const storedId = await load("user_id");
      const storedProfileId = await load("profile_id");
      const storedRole = await load("role_mode");

      if (uTok) setUserTokenState(uTok);
      if (storedId) setUserDataState(prev => ({ ...prev, id: Number(storedId) }));
      if (storedProfileId)
        setUserDataState(prev => ({ ...prev, profileId: Number(storedProfileId) }));
      if (storedRole === "farmer" || storedRole === "supplier") setRoleMode(storedRole);

      setUserAxiosToken(uTok || null);
      setInitialized(true);
    })();
  }, []);

  // =========================
  // Update role mode
  const updateRoleMode = async (mode: "farmer" | "supplier") => {
    setRoleMode(mode);
    await save("role_mode", mode);
  };

  // =========================
  // Set user token
  const setUserToken = async (token: string | null) => {
    if (token) await save("user_token", token);
    else await clear("user_token");

    setUserTokenState(token);
    setUserAxiosToken(token);

    if (!token) setUserDataState({ id: null, profileId: null });
  };
  const setVendorData = (data: Partial<VendorDataType>) => {
    setVendorDataState((prev) => ({ ...prev, ...data }));
  };
  // =========================
  // Set user data and persist
  const setUserData = (data: Partial<UserDataType>) => {
    setUserDataState(prev => {
      const updated = { ...prev, ...data };

      if (data.id != null) save("user_id", String(data.id));
      if (data.profileId != null) save("profile_id", String(data.profileId));

      return updated;
    });
  };

  // =========================
  // Logout clears all
  const logout = async () => {
    await setUserToken(null);
    await clear("user_id");
    await clear("profile_id");
    setUserDataState({ id: null, profileId: null });
  };

  return (
    <GlobalDataContext.Provider
      value={{
        userToken,
        userData,
        initialized,
        setUserToken,
        setUserData,
        logout,
        roleMode,
        updateRoleMode,
        vendorData,
        setVendorData,
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};

// =========================
// Hook
export const useGlobalData = (): GlobalDataContextType => {
  const ctx = useContext(GlobalDataContext);
  if (!ctx) throw new Error("useGlobalData must be used within GlobalDataProvider");
  return ctx;
};
