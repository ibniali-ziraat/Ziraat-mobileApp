import { typography } from "@/src/constants/fonts/typography";
import { Text, View } from "react-native";

const getOrderStep = (status: number) => {
  if ([1, 10, 20].includes(status)) return 1;
  if ([30, 40].includes(status)) return 2;
  if ([50, 60].includes(status)) return 3;
  if ([70].includes(status)) return 4;

  return 0;
};

const getSpecialState = (status: number) => {
  if (status === 35) return { label: "Payment Failed", color: "text-red-600" };

  if (status === 80) return { label: "Order Cancelled", color: "text-red-600" };

  if (status === 90) return { label: "Refunded", color: "text-purple-600" };

  if (status === 100) return { label: "Closed", color: "text-neutral-500" };

  return null;
};

const OrderProgress = ({ status }: { status: number }) => {
  const step = getOrderStep(status);
  const special = getSpecialState(status);

  const steps = ["New", "Processing", "Shipping", "Delivered"];

  return (
    <View className="bg-white rounded-xl p-5 shadow-md mb-5">
      <Text
        style={[typography.Poppins_s_bold]}
        className="text-neutral-900 mb-6 text-base"
      >
        Order Progress
      </Text>

      {special ? (
        <View className="bg-neutral-50 rounded-lg py-3 items-center">
          <Text className={`${special.color} font-semibold`}>
            {special.label}
          </Text>
        </View>
      ) : (
        <View className="flex-row justify-between items-center">
          {steps.map((label, index) => {
            const current = index + 1;
            const active = current <= step;

            return (
              <View key={index} className="flex-1 items-center">
                {/* Circle */}
                <View
                  className={`h-8 w-8 rounded-full items-center justify-center ${
                    active ? "bg-primary" : "bg-neutral-200"
                  }`}
                >
                  <View className="h-3 w-3 rounded-full bg-white" />
                </View>

                {/* Line */}
                {index !== steps.length - 1 && (
                  <View
                    className={`absolute top-4 left-[50%] h-[2px] w-full ${
                      current < step ? "bg-primary" : "bg-neutral-200"
                    }`}
                  />
                )}

                {/* Label */}
                <Text
                  className={`text-xs mt-2 ${
                    active ? "text-primary font-semibold" : "text-neutral-400"
                  }`}
                >
                  {label}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default OrderProgress;
