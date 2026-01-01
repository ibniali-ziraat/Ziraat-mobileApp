import axiosInstance from "../api/client/axiosInstance";
import { ID } from "../types/global";
import { safeGet } from "./helpers/safeGet";

export const deleteAccount = async (id:ID) => {
  return safeGet(
    axiosInstance.delete(`/api/core/userProfile/${id}`)
  );
};


