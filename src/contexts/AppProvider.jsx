import { AuthProvider } from "./AuthContext";
import { GlobalDataProvider } from "./GlobalDataContext";
import AppQueryClientProvider from "./QueryClientProvider";

function AppProvider({ children }) {
  return (
    <AppQueryClientProvider>
      <GlobalDataProvider>
        <AuthProvider>{children}</AuthProvider>
      </GlobalDataProvider>{" "}
    </AppQueryClientProvider>
  );
}

export default AppProvider;
