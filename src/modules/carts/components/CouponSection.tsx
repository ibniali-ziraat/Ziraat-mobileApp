import Loader from "@/src/components/shared/Loader";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { X } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type CouponType = {
  code: string;
  ruleName: string;
  discountAmount: number;
  endDate: string;
};

type Props = {
  showCoupons: boolean;
  setShowCoupons: (val: boolean) => void;
  couponData: CouponType[];
  isCheckingCoupon: boolean;
  selectedCoupon: string;
  onApplyCoupon: (coupon: CouponType) => void;
  onResetCoupon: () => void;
};

const CouponSection = ({
  showCoupons,
  setShowCoupons,
  couponData,
  isCheckingCoupon,
  selectedCoupon,
  onApplyCoupon,
  onResetCoupon,
}: Props) => {
  return (
    <View style={{ marginBottom: 20 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Text style={[typography.Poppins_m_semibold, { fontSize: 16 }]}>
          Apply Coupon
        </Text>

        <Pressable onPress={() => setShowCoupons(!showCoupons)}>
          <Text
            style={[
              typography.Poppins_s_regular,
              { color: colors.primary },
            ]}
          >
            {showCoupons ? "Hide" : "View All"}
          </Text>
        </Pressable>
      </View>

      {/* Coupon List */}
      {showCoupons && (
        <View
          style={{
            borderRadius: 16,
            backgroundColor: colors.light,
          }}
        >
          {isCheckingCoupon ? (
            <Loader />
          ) : couponData.length ? (
            couponData.map((coupon) => {
              const isSelected = selectedCoupon === coupon.code;

              return (
                <View
                  key={coupon.code}
                  style={{
                    padding: 8,
                    marginBottom: 8,
                    borderRadius: 16,
                    backgroundColor: colors.light,
                    borderWidth: 1,
                    borderColor: isSelected
                      ? colors.primary
                      : colors.darkHover,
                   
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                     
                    }}
                  >
                    <Text
                      style={[
                        typography.Poppins_m_semibold,
                        {
                          fontSize: 15,
                          color: isSelected
                            ? colors.primary
                            : colors.dark,
                        },
                      ]}
                    >
                      {coupon.code}
                    </Text>

                    <Text
                      style={{
                        color: colors.primary,
                        fontWeight: "600",
                        fontSize: 13,
                      }}
                    >
                      ₹{coupon.discountAmount} OFF
                    </Text>
                  </View>

                  {/* Rule */}
                  <Text
                    style={[
                      typography.Poppins_s_regular,
                    ]}
                  >
                    {coupon.ruleName}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {/* Expiry */}
                    <Text
                      style={{
                        fontSize: 12,
                      }}
                    >
                      Expires{" "}
                      {new Date(coupon.endDate).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                        }
                      )}
                    </Text>

                    {/* Small Button */}
                    {isSelected ? (
                      <View
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 8,
                          backgroundColor: colors.primary,
                        }}
                      >
                        <Text
                          style={{
                            color: colors.primary,
                            fontSize: 12,
                            fontWeight: "600",
                          }}
                        >
                          Applied
                        </Text>
                      </View>
                    ) : (
                      <Pressable
                        onPress={() => onApplyCoupon(coupon)}
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 3,
                          borderRadius: 8,
                          borderWidth: 1,
                          borderColor: colors.primary,
                        }}
                      >
                        <Text
                          style={{
                            color: colors.primary,
                            fontSize: 12,
                            fontWeight: "600",
                          }}
                        >
                          Apply
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              );
            })
          ) : (
            <Text
              style={{
                textAlign: "center",
                paddingVertical: 10,
              }}
            >
              No coupons available
            </Text>
          )}
        </View>
      )}

      {/* Selected Coupon Summary */}
      {!!selectedCoupon && (
        <View
          style={{
            marginTop: 14,
            padding: 14,
            borderRadius: 14,
            backgroundColor: colors.primary + "15",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.primary,
              fontWeight: "600",
            }}
          >
            🎉 {selectedCoupon} applied
          </Text>

          <Pressable onPress={onResetCoupon}>
            <X size={18} color={colors.primary} />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default CouponSection;