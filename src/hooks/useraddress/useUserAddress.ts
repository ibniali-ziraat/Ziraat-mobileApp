import {
  applyCoupon,
  checkout,
  createAddress,
  createCheckout,
  deleteUserAddress,
  editUserAddress,
  fetchCountries,
  fetchDistrictsByStates,
  fetchStatesByCountry,
  getExistingAddressess,
  getListAddresses,
  PostSetDefaultAddress,
} from "@/src/services/user-address.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// import { CreateCheckoutPayload } from "../../services/checkoutTypes";

export const useCouponCode = () => {
  return useMutation({
    mutationFn: (payload: { couponCode: string }) => applyCoupon(payload),
  });
};

export const useCheckout = () => {
  return useMutation({
    mutationFn: (payload: { couponCode: string }) => checkout(payload),
  });
};

// -----------------Create Address-----------

// export const useCreateAddress = () => {
//   return useMutation({
//     mutationFn: (payload) => createAddress(payload),
//   });
// };

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => createAddress(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["checkout-shipping"],
      });
    },
  });
};

export const useCreateCheckout = () => {
  return useMutation({
    mutationFn: (payload) => createCheckout(payload),
  });
};

// get all the addresses from the /List

export const useCheckoutShipping = () => {
  return useQuery({
    queryKey: ["checkout-shipping"],
    queryFn: () => getListAddresses(),
    staleTime: 0, // IMPORTANT
  });
};

export const useDeleteUserAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userAddressId: number) => deleteUserAddress(userAddressId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["checkout-shipping"],
      });
    },
  });
};

// export const useEditUserAddress = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({
//       userAddressId,
//       payload,
//     }: {
//       userAddressId: number;
//       payload: any;
//     }) => editUserAddress(userAddressId, payload),

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["checkout-shipping"],
//       });
//     },
//   });
// };

export const useExistingAddress = (userAddressId) => {
  return useQuery({
    queryKey: ["existing-addresses", userAddressId],
    queryFn: () => getExistingAddressess(userAddressId),
    enabled: !!userAddressId,
  });
};

// export const useEditUserAddress = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({
//       userAddressId,
//       payload,
//     }: {
//       userAddressId: number;
//       payload: any;
//     }) =>
//       editUserAddress(userAddressId, payload),

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["checkoutShipping"],
//       });
//     },
//   });
// };

export const useEditUserAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userAddressId,
      payload,
    }: {
      userAddressId: number;
      payload: any;
    }) => editUserAddress(userAddressId, payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["checkoutShipping"],
      });
    },
  });
};

export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });
};

export const useStates = (countryId: string) => {
  return useQuery({
    queryKey: ["states", countryId],
    queryFn: () => fetchStatesByCountry(countryId),
    enabled: !!countryId,
  });
};

export const useDistricts = (stateId: string) => {
  return useQuery({
    queryKey: ["states", stateId],
    queryFn: () => fetchDistrictsByStates(stateId),
    enabled: !!stateId,
  });
};

export const useDefaultAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userAddressId: number) => PostSetDefaultAddress(userAddressId),

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
