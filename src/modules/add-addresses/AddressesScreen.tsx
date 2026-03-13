import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import ConfirmDeleteModal from "@/src/components/ui/ConfirmDeleteModal";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";
import {
  useCheckoutShipping,
  useDefaultAddress,
  useDeleteUserAddress,
} from "@/src/hooks/useraddress/useUserAddress";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { PencilIcon, Plus, Trash2Icon } from "lucide-react-native";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const AddressListScreen = () => {
  const router = useRouter();

 const {
  data: userAddress = [],
  isLoading,
  refetch,
} = useCheckoutShipping();
useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const { mutate: deleteUserAddress, isPending } =
    useDeleteUserAddress();

  const {
    mutate: setAsDefault,
    isPending: isSettingDefault,
  } = useDefaultAddress();

  const [deleteId, setDeleteId] =
    useState<number | null>(null);

 
  const sortedAddresses = useMemo(() => {
    return [...userAddress].sort(
      (a, b) =>
        Number(b?.isDefaultShippingAddress) -
        Number(a?.isDefaultShippingAddress)
    );
  }, [userAddress]);

  const handleDelete = (userAddressId: number) => {
    setDeleteId(userAddressId);
  };

  const confirmDelete = () => {
    if (deleteId === null) return;

    deleteUserAddress(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
      },
    });
  };

  const handleSetDefault = (userAddressId: number) => {
    setAsDefault(userAddressId);
  };

  
  if (isLoading) {
    return (
      <ScreenLayout>
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ marginTop: 40 }}
        />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <BackHeader
        title="My Addresses"
        desc="Saved delivery addresses"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 120,
        }}
      >
        {/* Heading + Add */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text
            style={[
              typography.Poppins_s_semibold,
              { fontSize: 18, color: colors.dark },
            ]}
          >
            Saved Addresses
          </Text>

          <Pressable
            onPress={() =>
              router.push("/user/user-address-form")
            }
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
              backgroundColor: colors.primary,
            }}
          >
            <Plus
              size={16}
              color={colors.light}
              strokeWidth={2}
            />
            <Text
              style={{
                marginLeft: 4,
                fontSize: 12,
                fontWeight: "600",
                color: colors.light,
              }}
            >
              Add Address
            </Text>
          </Pressable>
        </View>

        {/* Empty State */}
        {sortedAddresses.length === 0 && (
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Text
              style={{
                color: colors.neutral,
                fontSize: 14,
              }}
            >
              No addresses found
            </Text>
          </View>
        )}

        {/* Address Cards */}
        {sortedAddresses.map((item: any) => {
          const isDefault =
            item?.isDefaultShippingAddress === true;

          return (
            <View
              key={item.userAddressId}
              style={[
                {
                  backgroundColor: colors.light,
                  borderRadius: 10,
                  padding: 17,
                  marginBottom: 18,
                },
                shadows.profile_card,
              ]}
            >
              {/* Top Row */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={[
                    typography.Poppins_s_semibold,
                    { fontSize: 16, color: colors.dark },
                  ]}
                >
                  {item.contactName}
                </Text>

                {isDefault && (
                  <View
                    style={{
                      backgroundColor:
                        colors.primary + "15",
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        color: colors.primary,
                        fontWeight: "600",
                      }}
                    >
                      DEFAULT
                    </Text>
                  </View>
                )}
              </View>

              <Text
                style={{
                  color: colors.darkHover,
                  marginVertical: 8,
                }}
              >
                {item.phone}
              </Text>

              <Text style={{ color: colors.neutral }}>
                {item.addressLine1}
              </Text>

              <Text style={{ color: colors.neutral }}>
                {item.districtName}, {item.stateOrProvinceName}
              </Text>

              <Text style={{ color: colors.neutral }}>
                {item.countryName}
              </Text>

              <View
                style={{
                  height: 1,
                  backgroundColor: "#f2f2f2",
                  marginVertical: 16,
                }}
              />

              {/* Actions */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {!isDefault ? (
                  <Pressable
                    onPress={() =>
                      handleSetDefault(item.userAddressId)
                    }
                    disabled={isSettingDefault}
                  >
                    {isSettingDefault ? (
                      <ActivityIndicator
                        size="small"
                        color={colors.primary}
                      />
                    ) : (
                      <Text
                        style={{
                          color: colors.primary,
                          fontWeight: "600",
                          fontSize: 13,
                        }}
                      >
                        MARK AS DEFAULT
                      </Text>
                    )}
                  </Pressable>
                ) : (
                  <Text
                    style={{
                      color: colors.primary,
                      fontWeight: "600",
                      fontSize: 13,
                    }}
                  >
                    DEFAULT
                  </Text>
                )}

                <View
                  style={{
                    flexDirection: "row",
                    gap: 18,
                  }}
                >
                  {/* Edit */}
                  <Pressable
                    disabled={isPending}
                    onPress={() =>
                      router.push(
                        `/user/user-address-form?id=${item.userAddressId}`
                      )
                    }
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor:
                        colors.primary + "15",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PencilIcon
                      size={18}
                      color={colors.primary}
                      strokeWidth={2}
                    />
                  </Pressable>

                  {/* Delete */}
                  <Pressable
                    disabled={isPending}
                    onPress={() =>
                      handleDelete(item.userAddressId)
                    }
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor:
                        colors.error + "15",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Trash2Icon
                      size={18}
                      color={colors.error}
                      strokeWidth={2}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          );
        })}

        {/* End Message */}
        {sortedAddresses.length > 0 && (
          <View
            style={{
              alignItems: "center",
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: colors.neutral,
                letterSpacing: 0.5,
              }}
            >
              You've reached the end
            </Text>
          </View>
        )}
      </ScrollView>

      <ConfirmDeleteModal
        visible={deleteId !== null}
        title="Delete Address"
        description="Are you sure you want to delete this address?"
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        loading={isPending}
      />
    </ScreenLayout>
  );
};

export default AddressListScreen;