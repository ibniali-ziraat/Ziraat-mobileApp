import { toast } from "@backpackapp-io/react-native-toast";

export const showSuccessToast = (msg) => {
  toast.dismiss();
  toast.success(msg);
};

export const showErrorToast = (msg) => {
  toast.dismiss();
  toast.error(msg);
};

export const showInfoToast = (msg) => {
  toast.dismiss();
  toast(msg);
};

export const showWarningToast = (msg) => {
  toast.dismiss();
  toast(msg, {
    backgroundColor: "orange",
  });
};

export const showCustomToast = (msg, options = {}) => {
  toast.dismiss();
  toast(msg, options);
};
