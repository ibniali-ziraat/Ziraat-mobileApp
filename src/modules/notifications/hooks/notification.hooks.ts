import { useMutation } from "@tanstack/react-query";
import { registerDeviceToken } from "../services/notification.service";

export const useRegisterDeviceToken = () => {
  return useMutation({
    mutationFn: registerDeviceToken,
  });
};
