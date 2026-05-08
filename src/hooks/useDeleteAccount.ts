import { useMutation } from "@tanstack/react-query";

import { deleteAccount } from "../services/deleteAccount.service";

export const useDeleteAccount = () =>
  useMutation ({
    mutationFn:  deleteAccount,
  });
