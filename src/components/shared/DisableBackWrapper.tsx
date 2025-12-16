import { useDisableBackOnLogout } from "@/src/hooks/useDisableBackOnLogout";

export function DisableBackWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useDisableBackOnLogout();
  return <>{children}</>;
}
