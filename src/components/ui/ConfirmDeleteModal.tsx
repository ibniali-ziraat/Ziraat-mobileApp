import { colors } from "@/src/constants/colors";
import { Modal, Pressable, View } from "react-native";
import CsText from "../shared/CsText";

interface ConfirmDeleteModalProps {
  visible: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ConfirmDeleteModal({
  visible,
  title = "Delete item?",
  description = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmDeleteModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50 px-6">
        <View 
         style={{backgroundColor:colors.light}}
        className="w-full rounded-2xl p-6">
          {/* Title */}
          <CsText
            className="text-lg font-semibold mb-2"
            style={{ color: colors.dark }}
          >
            {title}
         </CsText>

          {/* Description */}
          <CsText className="text-sm mb-6" style={{ color: colors.neutral }}>
            {description}
         </CsText>

          {/* Actions */}
          <View className="flex-row justify-end space-x-4">
            <Pressable onPress={onCancel} className="px-4 py-2 rounded-lg">
              <CsText className="font-medium" style={{ color: colors.darkHover }}>
                {cancelText}
             </CsText>
            </Pressable>

            <Pressable
              disabled={loading}
              onPress={onConfirm}
              className="px-4 py-2 rounded-lg"
              style={{ backgroundColor: colors.error }}
            >
              <CsText 
              style={{color:colors.light}}
              className="font-semibold">
                {loading ? "Deleting..." : confirmText}
             </CsText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
