import BackHeader from "@/src/components/shared/BackHeader";
import { useState } from "react";
import { Button, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import VendorLoginForm from "./VendorLoginFrom";
import BusinessScreen from "./screens/BusinessScreen";

export default function VendorAuthForm() {
  const [mode, setMode] = useState<"login" | "register">("register");

  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 20 }} className="bg-light">
        <BackHeader>
          {mode === "login" ? "Vendor Login" : "Vendor Registration"}
        </BackHeader>
        {mode === "login" ? <VendorLoginForm /> : <BusinessScreen />}

        <Button
          title={
            mode === "login" ? "Go to Vendor Register" : "Go to Vendor Login"
          }
          onPress={() => setMode(mode === "login" ? "register" : "login")}
        />
      </View>
    </ScrollView>
  );
}
