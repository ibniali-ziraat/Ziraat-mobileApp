import { createContext, useContext, useEffect, useState } from "react";
import { clear, load, save } from "../utils/authStorage";

interface AuthContextType {
  userToken: string | null;
  vendorToken: string | null;
  userTokenExp: string | null;

  orchardProfileId: number | null;

  userId: number | null;
  vendorId: number | null;

  userProfileId: number | null;
  vendorProfileId: number | null;

  roleMode: "farmer" | "supplier";
  initialized: boolean;

  setUserToken: (v: string | null) => Promise<void>;
  setVendorToken: (v: string | null) => void;
  setUserTokenExp: (v: string | null) => Promise<void>;

  setUserId: (v: number | null) => Promise<void>;
  setVendorId: (v: number | null) => void;
  setOrchardProfileId: (v: number | null) => void;

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
  const [orchardProfileId, setOrchardProfileIdState] = useState<number | null>(
    null,
  );

  const [userId, setUserIdState] = useState<number | null>(null);
  const [vendorId, setVendorIdState] = useState<number | null>(null);
  const [userTokenExp, setUserTokenExpState] = useState<string | null>(null);

  const [userProfileId, setUserProfileIdState] = useState<number | null>(null);
  const [vendorProfileId, setVendorProfileIdState] = useState<number | null>(
    null,
  );

  const [roleMode, setRoleModeState] = useState<"farmer" | "supplier">(
    "farmer",
  );
  const [initialized, setInitialized] = useState(false);

  // ---------------- AUTO LOGOUT ----------------
  useEffect(() => {
    if (!userTokenExp) return;

    const expTime = new Date(userTokenExp).getTime(); // parse ISO string
    const timeout = expTime - Date.now();

    if (timeout <= 0) {
      logoutUser();
      return;
    }

    const timer = setTimeout(() => logoutUser(), timeout);
    return () => clearTimeout(timer);
  }, [userTokenExp]);

  // ---------------- LOAD STORED VALUES ----------------
  useEffect(() => {
    (async () => {
      const storedToken = await load("user_token");
      const storedUserId = await load("user_id");
      const storedExp = await load("user_token_exp");

      // Clear if expired
      if (storedExp && new Date(storedExp).getTime() < Date.now()) {
        await clear("user_token");
        await clear("user_id");
        await clear("user_token_exp");
      } else {
        setUserTokenState(storedToken);
        setUserIdState(storedUserId ? Number(storedUserId) : null);
        setUserTokenExpState(storedExp || null);
      }

      setInitialized(true);
    })();
  }, []);

  // ---------------- SIMPLE SETTERS ----------------
  const setUserToken = async (token: string | null) => {
    if (token) await save("user_token", token);
    else await clear("user_token");

    setUserTokenState(token);
  };

  const setUserTokenExp = async (exp: string | null) => {
    if (exp) await save("user_token_exp", exp);
    else await clear("user_token_exp");

    setUserTokenExpState(exp);
  };

  const setUserId = async (v: number | null) => {
    if (v !== null) await save("user_id", String(v));
    else await clear("user_id");

    setUserIdState(v);
  };

  const setVendorToken = (token: string | null) => {
    setVendorTokenState(token);
  };

  const setVendorId = (v: number | null) => {
    setVendorIdState(v);
  };

  const setUserProfileId = (v: number | null) => setUserProfileIdState(v);
  const setVendorProfileId = (v: number | null) => setVendorProfileIdState(v);

  const setRoleMode = (mode: "farmer" | "supplier") => setRoleModeState(mode);
  const setOrchardProfileId = (v: number | null) => {
    setOrchardProfileIdState(v);
  };

  // ---------------- LOGOUT ----------------
  const logoutUser = async () => {
    await clear("user_token");
    await clear("user_id");
    await clear("user_token_exp");

    setUserTokenState(null);
    setUserIdState(null);
    setUserTokenExpState(null);

    setUserProfileIdState(null);
<<<<<<< HEAD
    setOrchardProfileIdState(null);
=======

    // router.replace("/auth/user"); // redirect to login
>>>>>>> 989965dbab3969b6105de85136a3a74827a93bd6
  };

  const logoutVendor = () => {
    setVendorTokenState(null);
    setVendorIdState(null);
    setVendorProfileIdState(null);
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
        userTokenExp,
        orchardProfileId,
        setUserTokenExp,
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
        setOrchardProfileId,
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
