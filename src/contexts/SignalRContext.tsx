import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as signalR from "@microsoft/signalr";
import axiosInstance from "../api/client/axiosInstance";
import { getItem } from "../utils/universalSecureToken";
import { useAuth } from "./AuthContext";

const HUB_URL = `${axiosInstance.defaults.baseURL}signalr`;

type SignalRContextType = {
  isConnected: boolean;
};

const SignalRContext = createContext<SignalRContextType | null>(null);

export function SignalRProvider({ children }: { children: React.ReactNode }) {
  const { userToken } = useAuth();
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userToken) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL, {
        accessTokenFactory: () => getItem("user_token").then((t) => t ?? ""),
        transport: signalR.HttpTransportType.WebSockets,
        // The negotiate POST (@microsoft/signalr's FetchHttpClient) sends no
        // Content-Length for its empty body, which this backend's IIS rejects
        // with 411. Skipping negotiation connects straight over WebSocket.
        skipNegotiation: true,
      })
      .withAutomaticReconnect()
      // The library's own ConsoleLogger routes Error/Critical straight to
      // console.error, which trips React Native's red-screen overlay on
      // every transient disconnect — even ones withAutomaticReconnect()
      // recovers from on its own. Silence it and log lifecycle events
      // ourselves via console.warn instead (non-fatal yellow-box).
      .configureLogging(signalR.LogLevel.None)
      .build();

    connection.on("getNotification", (notification) => {
      console.log(
        "[SignalR] message received:",
        JSON.stringify(notification),
      );
    });

    connection.onreconnecting((err) => {
      setIsConnected(false);
      console.warn("[SignalR] connection lost, reconnecting...", err);
    });

    connection.onreconnected(() => {
      setIsConnected(true);
      console.warn("[SignalR] reconnected, re-registering...");
      connection
        .invoke("Register")
        .catch((err) => console.warn("[SignalR] re-register failed:", err));
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
        await connection.invoke("Register");
        console.log("[SignalR] registered");
      })
      .catch((err) => console.warn("[SignalR] connection failed:", err));

    connectionRef.current = connection;

    return () => {
      if (
        connectionRef.current?.state === signalR.HubConnectionState.Connected
      ) {
        connectionRef.current.stop();
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
