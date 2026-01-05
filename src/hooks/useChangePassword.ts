import {
    ChangePasswordDto,
    changePasswordService,
} from "@/src/services/changepasswordService";
import { useMutation } from "@tanstack/react-query";

export function useChangePassword() {
    return useMutation({
        mutationFn: (payload: ChangePasswordDto) =>
            changePasswordService(payload),

        onSuccess: () => {
            console.log("Password changed successfully");
        },

        onError: (error: any) => {
            console.error(error.message);
        },
    });
}
