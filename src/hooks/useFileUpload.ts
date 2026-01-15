import { useMutation } from "@tanstack/react-query";
import { deleteUploadedFile, uploadFile } from "../services/fileUploadService";

export const useFileUploadMutation = () =>
  useMutation({
    mutationFn: uploadFile,
  });
export const useFileDeleteMutation = () =>
  useMutation({
    mutationFn: deleteUploadedFile,
  });
