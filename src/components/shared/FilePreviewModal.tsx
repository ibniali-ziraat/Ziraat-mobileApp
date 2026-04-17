import { colors } from "@/src/constants/colors";
import { X } from "lucide-react-native";
import { Dimensions, Image, Modal, Pressable } from "react-native";

interface FilePreviewModalProps {
  isVisible: boolean;
  fileUri: string;
  closeModal: () => void;
}

const FilePreviewModal = ({
  isVisible,
  fileUri,
  closeModal,
}: FilePreviewModalProps) => {
  const { width, height } = Dimensions.get("window");

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={closeModal}
    >
      {/* Full screen overlay */}
      <Pressable
        className="flex-1 justify-center items-center bg-black/90"
        activeOpacity={1}
        onPress={closeModal}
      >
        {/* Image container */}
        <Pressable
          activeOpacity={1}
          className="relative justify-center items-center"
        >
          {/* Close button */}
          <Pressable
            onPress={closeModal}
            className="absolute top-2 right-2 w-12 h-12 justify-center items-center z-10"
          >
            <X size={32} color={colors.light} />
          </Pressable>

          {/* Image */}
          <Image
            source={{ uri: fileUri }}
            style={{
              width: width * 0.95,
              height: height * 0.85,
              resizeMode: "contain",
            }}
            className="rounded-lg"
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default FilePreviewModal;
