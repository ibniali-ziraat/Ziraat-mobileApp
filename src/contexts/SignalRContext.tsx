import * as signalR from "@microsoft/signalr";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import axiosInstance from "../api/client/axiosInstance";
import { getItem } from "../utils/universalSecureToken";
import { useAuth } from "./AuthContext";
 
const API_BASE_URL = axiosInstance.defaults.baseURL?.replace(/\/+$/, "");
const HUB_URL = `${API_BASE_URL}/signalr`;
 
type SignalRContextType = {
  isConnected: boolean;
};
 
const SignalRContext = createContext<SignalRContextType | null>(null);
 
export function SignalRProvider({ children }: { children: React.ReactNode }) {
  const { userToken } = useAuth();
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);
 
  useEffect(() => {
    const getToken = async () => {
      const token = await getItem("user_token");
      return token?.replace(/^Bearer\s+/i, "") ?? "";
    };
 
    if (!userToken) return;
 
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL, {
        accessTokenFactory: getToken,
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.None)
      .build();
 
    connection.on("getNotification", (notification) => {
      console.log("[SignalR] message received:", JSON.stringify(notification));
    });
 
    connection.onreconnecting((err) => {
      setIsConnected(false);
      console.warn("[SignalR] connection lost, reconnecting...", err);
    });
 
    connection.onreconnected(async () => {
      setIsConnected(true);
      console.warn("[SignalR] reconnected, re-registering...");
 
      try {
        const registration = await connection.invoke("Register");
        console.log("[SignalR] re-registered:", registration);
      } catch (err) {
        console.warn("[SignalR] re-register failed:", err);
      }
    });
 
    connection.onclose((err) => {
      setIsConnected(false);
      console.warn("[SignalR] connection closed permanently:", err);
    });
 
    connection
      .start()
      .then(async () => {
        setIsConnected(true);
        console.log("[SignalR] connected, registering...");
 
        const registration = await connection.invoke("Register");
        console.log("[SignalR] registered:", registration);
      })
      .catch((err) => {
        setIsConnected(false);
        console.warn("[SignalR] connection failed:", err);
      });
 
    connectionRef.current = connection;
 
    return () => {
      const currentConnection = connectionRef.current;
 
      if (
        currentConnection &&
        currentConnection.state !== signalR.HubConnectionState.Disconnected
      ) {
        currentConnection.stop();
      }
 
      connectionRef.current = null;
    };
  }, [userToken]);
 
  return (
<SignalRContext.Provider value={{ isConnected }}>
      {children}
</SignalRContext.Provider>
  );
}
 
export function useSignalR() {
  const ctx = useContext(SignalRContext);
 
  if (!ctx) {
    throw new Error("useSignalR must be used within a SignalRProvider");
  }
 
  return ctx;
}