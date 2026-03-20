// components/discussion/DiscussionMessages.tsx

import { FlatList, StyleSheet } from "react-native";
import DiscussionBubble from "./ChatBubble";


const messages = [
  { id: "1", text: "Hi! Need help filling the form?", sender: "expert" },
  { id: "2", text: "Yes, GST section is confusing.", sender: "user" },
];

export default function DiscussionMessages() {
  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <DiscussionBubble message={item} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
  },
});