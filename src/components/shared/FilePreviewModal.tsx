import React from "react";
import { Modal, View, Image, TouchableOpacity, Dimensions } from "react-native";
import { X } from "lucide-react-native";
import { colors } from "@/src/constants/colors";

interface FilePreviewModalProps {
    isVisible: boolean;
    fileUri: string;
    closeModal: () => void;
}

const FilePreviewModal = ({ isVisible, fileUri, closeModal }: FilePreviewModalProps) => {
    const { width, height } = Dimensions.get("window");

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="fade"
            onRequestClose={closeModal}
        >
            {/* Full screen overlay */}
            <TouchableOpacity
                className="flex-1 justify-center items-center bg-black/90"
                activeOpacity={1}
                onPress={closeModal}
            >
                {/* Image container */}
                <TouchableOpacity
                    activeOpacity={1}
                    className="relative justify-center items-center"
                >
                    {/* Close button */}
                    <TouchableOpacity
                        onPress={closeModal}
                        className="absolute top-2 right-2 w-12 h-12 justify-center items-center z-10"
                    >
                        <X size={32} color={colors.light} />
                    </TouchableOpacity>

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
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

export default FilePreviewModal;
