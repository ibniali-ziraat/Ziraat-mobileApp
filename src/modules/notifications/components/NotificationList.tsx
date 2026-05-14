import { colors } from "@/src/constants/colors";
import { StyleSheet, Text, View } from "react-native";
import { StoredNotification } from "../types/Notification.types";
import SwipeableNotificationCard from "./Swipeablenotificationcard";

interface Props {
  items: StoredNotification[];
  onDelete: (id: string) => void;
}

export default function NotificationList({ items, onDelete }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.hint}>← swipe left to delete</Text>
      {items.map((item) => (
        <SwipeableNotificationCard
          key={item.id}
          item={item}
          onDelete={onDelete}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  hint: {
    fontSize: 11.5,
    color: colors.darkHover,
    fontWeight: "400",
    marginBottom: 10,
  },
});
