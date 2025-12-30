export const userDeleteConfig = {
  address: {
    success: "Address deleted successfully",
    queryKey: "addressSection",
  },
  education: {
    success: "Education deleted successfully",
    queryKey: "educationSection",
  },
  profession: {
    success: "Profession deleted successfully",
    queryKey: "professionSection",
  },
} as const;

export type UserDeleteKey = keyof typeof userDeleteConfig;
