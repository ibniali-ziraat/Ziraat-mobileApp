import { useMutation } from "@tanstack/react-query";
import { deleteUploadedFile, updateProfileSection, uploadFile } from "../services/fileUploadService";
  // const queryClient = useQueryClient();


export const useFileUploadMutation = () =>
  useMutation({
    mutationFn: uploadFile,
  });

export const useFileDeleteMutation = () =>
  useMutation({
    mutationFn: deleteUploadedFile,
  });

  export const useUpdateProfile = () =>
  useMutation({
    mutationFn: updateProfileSection,
  });

