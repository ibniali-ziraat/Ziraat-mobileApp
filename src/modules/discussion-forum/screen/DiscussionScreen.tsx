
import DiscussionSection from "../components/DiscussionSection";

import {
    KeyboardAvoidingView,
    Platform,
    View,
} from "react-native";

export default function DiscussionScreen() {
  return (
    <View style={{ flex: 1 }}>

      {/* <BackHeader
        title="Discussion"
        desc="Ask questions or get help from experts while filling the form."
      /> */}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <DiscussionSection />
      </KeyboardAvoidingView>

    </View>
  );
}