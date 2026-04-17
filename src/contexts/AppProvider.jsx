import { AuthProvider } from "./AuthContext";
import { NotificationProvider } from "./NotificationContext";
import { OrchardProvider } from "./OrchardContext";
import AppQueryClientProvider from "./QueryClientProvider";

function AppProvider({ children }) {
  return (
    <AppQueryClientProvider>
      <AuthProvider>
        <OrchardProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </OrchardProvider>
      </AuthProvider>
    </AppQueryClientProvider>
  );
}

export default AppProvider;
