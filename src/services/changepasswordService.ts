import axiosInstance from "../api/client/axiosInstance";

export type ChangePasswordDto = {
    oldPassword: string;
    newPassword: string;
};

export async function changePasswordService(
    payload: ChangePasswordDto
) {
    try {
        const { data } = await axiosInstance.post(
            "/auth/change-password",
            payload
        );

        return data;
    } catch (err: any) {
        const message =
            err?.response?.data?.message ||
            err?.message ||
            "Unable to change password";

        throw new Error(message);
    }
}
