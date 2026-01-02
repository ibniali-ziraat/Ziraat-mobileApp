import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../services/fileUploadService";

export const useFileUploadMutation = () =>
  useMutation({
    mutationFn: uploadFile,
  });
