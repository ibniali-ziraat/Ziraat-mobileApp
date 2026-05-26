import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/client/axiosInstance";
import { useProfileQuery } from "../hooks/userQueryHooks";
import { deleteItem, getItem, setItem } from "../utils/universalSecureToken";

export type UserProfile = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  age?: string;
  gender?: string;
  profilePic?: string;
  createdOn?: string;
};

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
  profileData: UserProfile | null;

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

  const { data: profileData = null } = useProfileQuery(userId);

  // ---------------- LOGOUT ----------------
  const logoutUser = async () => {
    await deleteItem("user_token");
    await deleteItem("user_id");
    await deleteItem("user_token_exp");
    setUserTokenState(null);
    setUserIdState(null);
    setUserTokenExpState(null);
    setUserProfileIdState(null);
    setOrchardProfileIdState(null);
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

  useEffect(() => {
    const reqInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        const tokenExp = await getItem("user_token_exp");

        if (tokenExp && new Date(tokenExp).getTime() < Date.now()) {
          await logoutUser();
          return Promise.reject(new Error("Token expired. User logged out."));
        }

        const token = await getItem("user_token");
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    const resInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          await logoutUser();
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, []);

  useEffect(() => {
    if (profileData?.id) {
      setUserProfileIdState(profileData.id);
    }
  }, [profileData]);

  useEffect(() => {
    if (!userTokenExp) return;
    const expTime = new Date(userTokenExp).getTime();
    const timeout = expTime - Date.now();
    if (timeout <= 0) {
      logoutUser();
      return;
    }
    const timer = setTimeout(() => logoutUser(), timeout);
    return () => clearTimeout(timer);
  }, [userTokenExp]);

  useEffect(() => {
    (async () => {
      const storedToken = await getItem("user_token");
      const storedUserId = await getItem("user_id");
      const storedExp = await getItem("user_token_exp");

      if (storedExp && new Date(storedExp).getTime() < Date.now()) {
        await deleteItem("user_token");
        await deleteItem("user_id");
        await deleteItem("user_token_exp");
      } else {
        setUserTokenState(storedToken);
        setUserIdState(storedUserId ? Number(storedUserId) : null);
        setUserTokenExpState(storedExp || null);
      }

      setInitialized(true);
    })();
  }, []);

  const setUserToken = async (token: string | null) => {
    if (token) await setItem("user_token", token);
    else await deleteItem("user_token");
    setUserTokenState(token);
  };

  const setUserTokenExp = async (exp: string | null) => {
    if (exp) await setItem("user_token_exp", exp);
    else await deleteItem("user_token_exp");
    setUserTokenExpState(exp);
  };

  const setUserId = async (v: number | null) => {
    if (v !== null) await setItem("user_id", String(v));
    else await deleteItem("user_id");
    setUserIdState(v);
  };

  const setVendorToken = (token: string | null) => setVendorTokenState(token);
  const setVendorId = (v: number | null) => setVendorIdState(v);
  const setUserProfileId = (v: number | null) => setUserProfileIdState(v);
  const setVendorProfileId = (v: number | null) => setVendorProfileIdState(v);
  const setRoleMode = (mode: "farmer" | "supplier") => setRoleModeState(mode);
  const setOrchardProfileId = (v: number | null) => setOrchardProfileIdState(v);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        vendorToken,
        userTokenExp,
        orchardProfileId,
        userId,
        vendorId,
        userProfileId,
        vendorProfileId,
        roleMode,
        initialized,
        profileData,
        setUserToken,
        setVendorToken,
        setUserTokenExp,
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
