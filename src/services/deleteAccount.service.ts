import axiosInstance from "../api/client/axiosInstance";
import { ID } from "../types/global";

// `id` is the login user id (AuthContext.userId). Errors are left to throw:
// safeGet() turns a 404 into `null`, which would make a failed delete look
// like a success and log the user out while the account still exists.
export const deleteAccount = async (id: ID) => {
  const { data } = await axiosInstance.delete(`/api/users/${id}`);
  return data;
};
