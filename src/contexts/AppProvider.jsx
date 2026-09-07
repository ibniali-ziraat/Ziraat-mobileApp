import { AuthProvider } from "./AuthContext";
import { LocationProvider } from "./LocationContext"; // ← was LocationContext
import { NotificationProvider } from "./NotificationContext";
import { OrchardProvider } from "./OrchardContext";
import AppQueryClientProvider from "./QueryClientProvider";
import { SignalRProvider } from "./SignalRContext";

function AppProvider({ children }) {
  return (
    <AppQueryClientProvider>
      <AuthProvider>
        <SignalRProvider>
          <OrchardProvider>
            <LocationProvider>
              <NotificationProvider>{children}</NotificationProvider>
            </LocationProvider>
          </OrchardProvider>
        </SignalRProvider>
      </AuthProvider>
    </AppQueryClientProvider>
  );
}

export default AppProvider;
