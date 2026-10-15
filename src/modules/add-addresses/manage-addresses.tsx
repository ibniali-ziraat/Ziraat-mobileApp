import BackHeader from "@/src/components/shared/BackHeader";
import Loader from "@/src/components/shared/Loader";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import ConfirmDeleteModal from "@/src/components/ui/ConfirmDeleteModal";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { shadows } from "@/src/constants/shadows";
import {
  useCheckoutShipping,
  useDefaultAddress,
  useDeleteUserAddress,
} from "@/src/hooks/useraddress/useUserAddress";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import {
  CheckCircle2,
  MapPin,
  PencilIcon,
  Trash2Icon,
} from "lucide-react-native";
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

  const { data: userAddress = [], isLoading, refetch } = useCheckoutShipping();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const { mutate: deleteUserAddress, isPending } = useDeleteUserAddress();

  const { mutate: setAsDefault, isPending: isSettingDefault } =
    useDefaultAddress();

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const sortedAddresses = useMemo(() => {
    return [...userAddress].sort(
      (a, b) =>
        Number(b?.isDefaultShippingAddress) -
        Number(a?.isDefaultShippingAddress),
    );
  }, [userAddress]);

  const handleDelete = (userAddressId: number) => {
    setDeleteId(userAddressId);
  };

  const confirmDelete = () => {
    if (deleteId === null) return;

    deleteUserAddress(deleteId, {
      onSuccess: async () => {
        await refetch();
        setDeleteId(null);
      },
    });
  };

  const handleSetDefault = (userAddressId: number) => {
    setAsDefault(userAddressId, {
      onSuccess: async () => {
        await refetch();
      },
    });
  };

  if (isLoading) {
    return (
      <ScreenLayout>
        <Loader />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout scrollable={false}>
      <BackHeader
        title="My Addresses"
        desc="Saved delivery addresses"
        onPress={() => router.replace(ROUTES.TABS.MORE)}
      />

      <ScreenContent>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{}}
        >
          {/* Top Header */}
          <View
            style={{
              marginTop: 18,
              marginBottom: 22,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={[
                  typography.Poppins_s_semibold,
                  {
                    fontSize: 22,
                    color: colors.dark,
                  },
                ]}
              >
                Saved Addresses
              </Text>

              <Text
                style={{
                  marginTop: 4,
                  fontSize: 15,
                  color: colors.darkHover,
                }}
              >
                Manage your delivery locations
              </Text>
            </View>

            <Pressable
              onPress={() => router.push(ROUTES.ACCOUNT.ADDRESS_FORM)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 18,
                backgroundColor: colors.primary,
                ...shadows.profile_card,
              }}
            >
              <Text
                style={{
                  marginLeft: 6,
                  fontSize: 15,
                  fontWeight: "700",
                  color: colors.light,
                }}
              >
                Add Address
              </Text>
            </Pressable>
          </View>

          {/* Empty State */}
          {sortedAddresses.length === 0 && (
            <View
              style={{
                flex: 1,
                marginTop: 80,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 45,
                  backgroundColor: colors.primary + "10",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 18,
                }}
              >
                <MapPin size={38} color={colors.primary} />
              </View>

              <Text
                style={[
                  typography.Poppins_s_semibold,
                  {
                    fontSize: 18,
                    color: colors.dark,
                  },
                ]}
              >
                No Addresses Found
              </Text>

              <Text
                style={{
                  marginTop: 6,
                  textAlign: "center",
                  color: colors.neutral,
                  fontSize: 15,
                  lineHeight: 26,
                  paddingHorizontal: 30,
                }}
              >
                Add your delivery address to make checkout faster and easier.
              </Text>
            </View>
          )}

          {/* Address Cards */}
          {sortedAddresses.map((item: any) => {
            const isDefault = item?.isDefaultShippingAddress === true;

            return (
              <View
                key={item.userAddressId}
                style={[
                  {
                    backgroundColor: colors.light,
                    borderRadius: 24,
                    padding: 18,
                    marginBottom: 18,
                    borderWidth: 1,
                    borderColor: isDefault ? colors.primary + "25" : "#F1F1F1",
                  },
                  shadows.profile_card,
                ]}
              >
                {/* Top */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <View style={{ flex: 1, paddingRight: 12 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 12,
                      }}
                    >
                      <View
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 14,
                          backgroundColor: colors.primary + "15",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 12,
                        }}
                      >
                        <MapPin size={20} color={colors.primary} />
                      </View>

                      <View style={{ flex: 1 }}>
                        <Text
                          style={[
                            typography.Poppins_s_semibold,
                            {
                              fontSize: 17,
                              color: colors.dark,
                            },
                          ]}
                        >
                          {item.contactName}
                        </Text>

                        <Text
                          style={{
                            marginTop: 2,
                            color: colors.darkHover,
                            fontSize: 15,
                          }}
                        >
                          {item.phone}
                        </Text>
                      </View>
                    </View>

                    {isDefault && (
                      <View
                        style={{
                          alignSelf: "flex-start",
                          flexDirection: "row",
                          alignItems: "center",
                          backgroundColor: colors.primary + "12",
                          paddingHorizontal: 12,
                          paddingVertical: 6,
                          borderRadius: 20,
                          marginBottom: 14,
                        }}
                      >
                        <CheckCircle2 size={14} color={colors.primary} />

                        <Text
                          style={{
                            marginLeft: 6,
                            color: colors.primary,
                            fontSize: 13.5,
                            fontWeight: "700",
                            letterSpacing: 0.5,
                          }}
                        >
                          DEFAULT ADDRESS
                        </Text>
                      </View>
                    )}

                    {/* Address */}
                    <View
                      style={{
                        backgroundColor: "#FAFAFA",
                        borderRadius: 18,
                        padding: 14,
                      }}
                    >
                      <Text
                        style={{
                          color: colors.dark,
                          fontSize: 16,
                          lineHeight: 28,
                        }}
                      >
                        {item.addressLine1}
                      </Text>

                      <Text
                        style={{
                          color: colors.neutral,
                          fontSize: 15,
                          lineHeight: 26,
                          marginTop: 2,
                        }}
                      >
                        {item.districtName}, {item.stateOrProvinceName}
                      </Text>

                      <Text
                        style={{
                          color: colors.neutral,
                          fontSize: 15,
                          marginTop: 2,
                        }}
                      >
                        {item.countryName}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Bottom Actions */}
                <View
                  style={{
                    marginTop: 18,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {!isDefault ? (
                    <Pressable
                      onPress={() => handleSetDefault(item.userAddressId)}
                      disabled={isSettingDefault}
                      style={{
                        backgroundColor: colors.primary + "10",
                        paddingHorizontal: 16,
                        paddingVertical: 10,
                        borderRadius: 14,
                      }}
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
                            fontWeight: "700",
                            fontSize: 14,
                            letterSpacing: 0.4,
                          }}
                        >
                          SET AS DEFAULT
                        </Text>
                      )}
                    </Pressable>
                  ) : (
                    <View
                      style={{
                        backgroundColor: colors.primary + "12",
                        paddingHorizontal: 16,
                        paddingVertical: 10,
                        borderRadius: 14,
                      }}
                    >
                      <Text
                        style={{
                          color: colors.primary,
                          fontWeight: "700",
                          fontSize: 14,
                        }}
                      >
                        CURRENT DEFAULT
                      </Text>
                    </View>
                  )}

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    {/* Edit */}
                    <Pressable
                      disabled={isPending}
                      onPress={() =>
                        router.push(
                          `${ROUTES.ACCOUNT.ADDRESS_FORM}?id=${item.userAddressId}`,
                        )
                      }
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 16,
                        backgroundColor: colors.primary + "12",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PencilIcon
                        size={18}
                        color={colors.primary}
                        strokeWidth={2.2}
                      />
                    </Pressable>

                    {/* Delete */}
                    <Pressable
                      disabled={isPending}
                      onPress={() => handleDelete(item.userAddressId)}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 16,
                        backgroundColor: colors.error + "12",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Trash2Icon
                        size={18}
                        color={colors.error}
                        strokeWidth={2.2}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <ConfirmDeleteModal
          visible={deleteId !== null}
          title="Delete Address"
          description="Are you sure you want to delete this address?"
          onCancel={() => setDeleteId(null)}
          onConfirm={confirmDelete}
          loading={isPending}
        />
      </ScreenContent>
    </ScreenLayout>
  );
};

export default AddressListScreen;
