import { useMutation } from "@tanstack/react-query";
import {
  registerDeviceToken,
  updateTokenLocation,
} from "../services/notification.service";

export const useRegisterDeviceToken = () => {
  return useMutation({ mutationFn: registerDeviceToken });
};

export const useUpdateTokenLocation = () => {
  return useMutation({ mutationFn: updateTokenLocation });
};
