import axiosInstance from "../api/client/axiosInstance";

export type ChangeCurrentPasswordPayload = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const currentPasswordService = async (
  payload: ChangeCurrentPasswordPayload
) => {
  const form = new URLSearchParams();

  form.append("OldPassword", payload.oldPassword);
  form.append("NewPassword", payload.newPassword);
  form.append("ConfirmPassword", payload.confirmPassword);

  const { data } = await axiosInstance.post(
    "user/change-password", // NO leading slash
    form,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return data;
};




// import axiosInstance from "../api/client/axiosInstance";

// export type ChangeCurrentPasswordPayload = {
//   oldPassword: string;
//   newPassword: string;
//   confirmPassword: string;
// };

// export const currentPasswordService = async (
//   payload: ChangeCurrentPasswordPayload
// ) => {
//   const { data } = await axiosInstance.post(
//     "user/change-password",
//     null, 
//     {
//       params: {
//         OldPassword: payload.oldPassword,
//         NewPassword: payload.newPassword,
//         ConfirmPassword: payload.confirmPassword,
//       },




































//     }
//   );

//   return data;
// };
