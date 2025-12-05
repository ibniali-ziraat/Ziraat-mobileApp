import { toast } from "@backpackapp-io/react-native-toast";

export const showSuccessToast = (msg) => {
  toast.success(msg);
};

export const showErrorToast = (msg) => {
  toast.error(msg);
};

export const showInfoToast = (msg) => {
  toast(msg);
};

export const showWarningToast = (msg) => {
  toast(msg, {
    backgroundColor: "orange",
  });
};

export const showCustomToast = (msg, options = {}) => {
  toast(msg, options);
};
