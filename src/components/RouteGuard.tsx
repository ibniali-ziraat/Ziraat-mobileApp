import { useAuth } from "@/src/contexts/AuthContext";
import { Redirect } from "expo-router";
import { ReactNode } from "react";
import Loader from "./shared/Loader";

export default function RouteGuard({ children }: { children: ReactNode }) {
  const { userToken, initialized } = useAuth();

  if (!initialized) {
    return <Loader />;
  }

  if (!userToken) {
    return <Redirect href="/auth/user" />;
  }

  return <>{children}</>;
}
