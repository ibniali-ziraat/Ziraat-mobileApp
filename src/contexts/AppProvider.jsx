import { AuthProvider } from "./AuthContext";
import { LocationProvider } from "./LocationContext"; // ← was LocationContext
import { NotificationProvider } from "./NotificationContext";
import { OrchardProvider } from "./OrchardContext";
import AppQueryClientProvider from "./QueryClientProvider";

function AppProvider({ children }) {
  return (
    <AppQueryClientProvider>
      <AuthProvider>
        <OrchardProvider>
          <LocationProvider>
            <NotificationProvider>{children}</NotificationProvider>
          </LocationProvider>
        </OrchardProvider>
      </AuthProvider>
    </AppQueryClientProvider>
  );
}

export default AppProvider;
