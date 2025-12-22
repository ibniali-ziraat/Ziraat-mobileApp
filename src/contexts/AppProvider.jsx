import { AuthProvider } from "./AuthContext";
import { OrchardProvider } from "./OrchardContext";
import AppQueryClientProvider from "./QueryClientProvider";

function AppProvider({ children }) {
  return (
    <AppQueryClientProvider>
      <AuthProvider>
        <OrchardProvider>{children}</OrchardProvider>
      </AuthProvider>
    </AppQueryClientProvider>
  );
}

export default AppProvider;
