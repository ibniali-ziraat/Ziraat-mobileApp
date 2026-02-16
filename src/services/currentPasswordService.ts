import axiosInstance from "../api/client/axiosInstance";


export type ChangeCurrentPasswordPayload = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const currentPasswordService = async (
  payload: ChangeCurrentPasswordPayload
) => {
  const { data } = await axiosInstance.post(
    "/user/change-password",
    null, 
    {
      params: {
        OldPassword: payload.oldPassword,
        NewPassword: payload.newPassword,
        ConfirmPassword: payload.confirmPassword,
      },
    }
  );

  return data;
};
