import React, { createContext, useContext, useEffect, useState } from "react";
import { clear, load, save } from "../utils/authStorage";
import { router } from "expo-router";

interface AuthContextType {
  userToken: string | null;
  vendorToken: string | null;

  userId: number | null;
  vendorId: number | null;

  userProfileId: number | null;
  vendorProfileId: number | null;

  roleMode: "farmer" | "supplier";
  initialized: boolean;

  setUserToken: (v: string | null) => Promise<void>;
  setVendorToken: (v: string | null) => void; // no storage

  setUserId: (v: number | null) => Promise<void>;
  setVendorId: (v: number | null) => void; // no storage

  setUserProfileId: (v: number | null) => void;
  setVendorProfileId: (v: number | null) => void;

  setRoleMode: (mode: "farmer" | "supplier") => void;

  logoutUser: () => Promise<void>;
  logoutVendor: () => void;
  logoutAll: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const [userToken, setUserTokenState] = useState<string | null>(null);
  const [vendorToken, setVendorTokenState] = useState<string | null>(null);

  const [userId, setUserIdState] = useState<number | null>(null);
  const [vendorId, setVendorIdState] = useState<number | null>(null);

  const [userProfileId, setUserProfileIdState] = useState<number | null>(null);
  const [vendorProfileId, setVendorProfileIdState] = useState<number | null>(
    null
  );

  const [roleMode, setRoleModeState] = useState<"farmer" | "supplier">(
    "farmer"
  );
  const [initialized, setInitialized] = useState(false);

  // Load on app start
  useEffect(() => {
    (async () => {
      const storedToken = await load("user_token");
      const storedUserId = await load("user_id");

      // Only these two come from storage
      setUserTokenState(storedToken);
      setUserIdState(storedUserId ? Number(storedUserId) : null);

      // Apply axios auth token
      // setUserAxiosToken(storedToken);

      // Others are NOT stored, so remain null/default
      setInitialized(true);
    })();
  }, []);

  // ---------------- SIMPLE SETTERS ----------------
  // Stored
  const setUserToken = async (token: string | null) => {
    if (token) await save("user_token", token);
    else await clear("user_token");

    setUserTokenState(token);
    // setUserAxiosToken(token);
  };

  const setUserId = async (v: number | null) => {
    if (v !== null) await save("user_id", String(v));
    else await clear("user_id");

    setUserIdState(v);
  };

  // Not stored
  const setVendorToken = (token: string | null) => {
    setVendorTokenState(token);
    // setVendorAxiosToken(token);
  };

  const setVendorId = (v: number | null) => {
    setVendorIdState(v);
  };

  const setUserProfileId = (v: number | null) => setUserProfileIdState(v);
  const setVendorProfileId = (v: number | null) => setVendorProfileIdState(v);

  const setRoleMode = (mode: "farmer" | "supplier") => setRoleModeState(mode);

  // ---------------- LOGOUT ----------------
  const logoutUser = async () => {
    await clear("user_token");
    await clear("user_id");

    setUserTokenState(null);
    setUserIdState(null);
    // setUserAxiosToken(null);

    // Non-stored fields also reset
    setUserProfileIdState(null);
    // router.replace("/auth/user");
  };

  const logoutVendor = () => {
    setVendorTokenState(null);
    setVendorIdState(null);
    setVendorProfileIdState(null);
    // setVendorAxiosToken(null);
  };

  const logoutAll = async () => {
    await logoutUser();
    logoutVendor();
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        vendorToken,
        userId,
        vendorId,
        userProfileId,
        vendorProfileId,
        roleMode,
        initialized,
        setUserToken,
        setVendorToken,
        setUserId,
        setVendorId,
        setUserProfileId,
        setVendorProfileId,
        setRoleMode,
        logoutUser,
        logoutVendor,
        logoutAll,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
