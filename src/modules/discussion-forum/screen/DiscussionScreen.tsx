// screens/form/YourFormScreen.tsx


import ScreenLayout from "@/src/components/shared/ScreenLayout";
import DiscussionPanel from "../components/ChatPanel";

export default function discussionScreen() {
  return (
    <ScreenLayout>
      {/* 🧾 Your Existing Form UI Here */}

      {/* 💬 Discussion Chat */}
      <DiscussionPanel />
    </ScreenLayout>
  );
}