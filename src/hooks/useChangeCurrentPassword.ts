// import { useMutation } from "@tanstack/react-query";
// import {
//     ChangeCurrentPasswordPayload,
//     currentPasswordService,
// } from "../services/currentPasswordService";

// export const useChangeCurrentPassword = () => {
//   return useMutation({
//     mutationFn: (payload: ChangeCurrentPasswordPayload) =>
//       currentPasswordService(payload),
//   });
// };


import { useMutation } from "@tanstack/react-query";
import {
    ChangeCurrentPasswordPayload,
    currentPasswordService,
} from "../services/currentPasswordService";

export const useChangeCurrentPassword = () => {
  return useMutation({
    mutationFn: (payload: ChangeCurrentPasswordPayload) =>
      currentPasswordService(payload),
  });
};
