import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { PanResponder, Pressable, View } from "react-native";

import Animated, {
  Easing,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  interpolate,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import CsText from "./CsText";

const primary = "#2d6b06";
const secondary = "#c7611f";

const vendor = {
  name: "GreenField Agro Distributors",
  vendorCode: "ZV_A73BB1_NYC",
  businessType: "Wholesale Agro Supply",
  registrationDate: "12 Jan 2024",
  lastUpdated: "19 Feb 2025",

  completion: 84,
  nextTask: "Upload Digital Signature (DSC)",

  kyc: [
    {
      ok: true,
      label: "GST Number Verified",
      details: "GSTIN: 22ABCTY2917K1A9",
      timestamp: "Completed 4 days ago",
    },
    {
      ok: true,
      label: "PAN Verified",
      details: "PAN: ABCDE1234T",
      timestamp: "Completed 4 days ago",
    },
    {
      ok: true,
      label: "Bank Linked",
      details: "SBI ••••3328 (IFSC: SBIN000771)",
      timestamp: "Completed 3 days ago",
    },
    {
      ok: false,
      label: "Digital Signature Pending",
      details: "DSC certificate not uploaded",
      timestamp: "Required before approval",
    },
    {
      ok: false,
      label: "Insurance Document Pending",
      details: "Business liability insurance not provided",
      timestamp: "Awaiting vendor upload",
    },
  ],

  zone: {
    title: "Kahmir (Primary Delivery Region)",
    items: [
      "Service Area: Srinagar, Kashmir",
      "Warehouse Coverage Radius: 27 km",
      "Avg Daily Orders: 120–180",
      "Delivery SLA: 6 Hours (Urban Standard)",
      "Active Clients: 84 Retailers | 11 Distributors",
    ],
  },
};

function ProgressRing({ percent }) {
  const progress = useSharedValue(0);

  progress.value = withTiming(percent, {
    duration: 1200,
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const animatedCircle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(progress.value, [0, 100], [0.55, 1]) }],
  }));

  return (
    <Animated.View
      className="w-16 h-16 rounded-full items-center justify-center"
      style={[
        animatedCircle,
        {
          backgroundColor: primary + "15",
          shadowColor: primary,
          shadowOpacity: 0.18,
          shadowRadius: 4,
          elevation: 3,
        },
      ]}
    >
      <CsText className="font-extrabold text-lg text-primary">
        {percent}%
      </CsText>
    </Animated.View>
  );
}

function useParallax() {
  const tiltX = useSharedValue(0);
  const tiltY = useSharedValue(0);

  const responder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, g) => {
      tiltX.value = g.dy / 70;
      tiltY.value = g.dx / 70;
    },
    onPanResponderRelease: () => {
      tiltX.value = withSpring(0);
      tiltY.value = withSpring(0);
    },
  });

  const animated = useAnimatedStyle(() => ({
    transform: [
      { rotateX: `${tiltX.value}deg` },
      { rotateY: `${tiltY.value}deg` },
      { scale: withSpring(1.02) },
    ],
  }));

  return { responder, animated };
}

export default function OverviewCard() {
  const [expanded, setExpanded] = useState(true);
  const { responder, animated } = useParallax();

  return (
    <Animated.View
      {...responder.panHandlers}
      entering={FadeInUp.duration(750)}
      layout={Layout.springify()}
      className="bg-white p-3 mt-4 rounded-2xl"
      style={[
        animated,
        {
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 3,
        },
      ]}
    >
      {/* HEADER */}
      <View className="flex-row justify-between items-center">
        <View>
          <CsText className="text-lg font-extrabold text-black">
            Onboarding Status
          </CsText>
          <CsText className="text-[11px] text-gray-700 mt-[2px]">
            Vendor KYC + Document Verification
          </CsText>
        </View>

        <Pressable
          onPress={() => setExpanded(!expanded)}
          className="p-2 rounded-full bg-gray-100"
        >
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="#333"
          />
        </Pressable>
      </View>

      {/* PROGRESS SECTION */}
      <Animated.View
        entering={FadeInDown.delay(50)}
        className="bg-gray-50 p-4 mt-4 rounded-xl border border-gray-200"
      >
        <View className="flex-row items-center">
          {/* Progress Ring */}
          <ProgressRing percent={vendor.completion} />

          {/* Text */}
          <View className="ml-4 flex-1">
            <CsText className="font-semibold text-black text-sm">
              Completion Progress
            </CsText>
            <CsText className="text-xs text-gray-700 mt-[2px]">
              {vendor.completion}% onboarding complete
            </CsText>
          </View>
        </View>

        {/* Slim modern progress bar */}
        <View className="h-1.5 bg-gray-200 rounded-full mt-4 overflow-hidden">
          <Animated.View
            entering={FadeInRight.delay(120)}
            style={{
              width: `${vendor.completion}%`,
              backgroundColor: secondary,
            }}
            className="h-full rounded-full"
          />
        </View>

        {/* Status text row */}
        <View className="flex-row justify-between mt-2">
          <CsText className="text-[10px] text-gray-600">Started</CsText>
          <CsText className="text-[10px] text-gray-600">Almost Done</CsText>
        </View>
      </Animated.View>

      {/* COLLAPSIBLE */}
      {expanded && (
        <Animated.View
          layout={Layout.springify()}
          entering={FadeInUp.delay(100)}
        >
          {/* NEXT TASK */}
          <Animated.View
            entering={FadeInLeft.duration(600)}
            className="bg-secondary/10 p-4 rounded-xl mt-4 flex-row items-center"
          >
            <Ionicons name="alert-circle" size={22} color={secondary} />
            <View className="ml-3 flex-1">
              <CsText className="text-secondary font-semibold">
                Next Step
              </CsText>
              <CsText className="text-xs text-gray-700">
                {vendor.nextTask}
              </CsText>
            </View>
          </Animated.View>

          {/* VERIFICATION TIMELINE */}
          <CsText className="font-semibold text-lg text-gray-900 mt-6 mb-3">
            Verification Timeline
          </CsText>

          {vendor.kyc.map((step, index) => (
            <Animated.View
              key={index}
              entering={FadeInLeft.delay(150 + index * 120)}
              className="flex-row items-start mb-5"
            >
              <View
                className="w-11 h-11 rounded-xl items-center justify-center bg-white shadow-sm"
                style={{ elevation: 2 }}
              >
                <Ionicons
                  name={step.ok ? "checkmark-circle" : "time-outline"}
                  size={22}
                  color={step.ok ? primary : secondary}
                />
              </View>

              <View className="ml-3 flex-1">
                <CsText
                  className={`text-sm font-semibold ${
                    step.ok ? "text-black" : "text-secondary"
                  }`}
                >
                  {step.label}
                </CsText>

                <CsText className="text-[11px] text-gray-700 mt-[3px]">
                  {step.details}
                </CsText>

                <View className="flex-row items-center mt-2">
                  <Ionicons name="calendar-outline" size={12} color="#777" />
                  <CsText className="text-[10px] text-gray-600 ml-1">
                    {step.timestamp}
                  </CsText>
                </View>

                {index !== vendor.kyc.length - 1 && (
                  <View className="h-[1px] bg-gray-200 mt-3" />
                )}
              </View>
            </Animated.View>
          ))}

          {/* VENDOR CODE */}
          <Animated.View
            entering={FadeInUp.delay(450)}
            className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20"
          >
            <View className="flex-row items-center mb-1">
              <Ionicons name="shield-checkmark" size={16} color={primary} />
              <CsText className="text-primary font-semibold text-sm ml-2">
                Vendor Code
              </CsText>
            </View>

            <CsText className="text-2xl font-extrabold text-primary tracking-wide">
              {vendor.vendorCode}
            </CsText>

            <View className="h-[1px] bg-primary/20 mt-3 mb-2" />

            <CsText className="text-[11px] text-gray-600 leading-4">
              Used for ZIRAAT mapping and credit approvals.
            </CsText>
          </Animated.View>

          {/* ZONE DETAILS */}
          <Animated.View
            entering={FadeInUp.delay(650)}
            className="mt-6 p-5 rounded-xl bg-white"
            style={{
              borderWidth: 1,
              borderColor: "#e0e0e0",
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <View className="flex-row items-center mb-3">
              <Ionicons name="location-outline" size={22} color={secondary} />
              <CsText className="ml-3 text-black font-semibold text-lg">
                {vendor.zone.title}
              </CsText>
            </View>

            {vendor.zone.items.map((item, index) => (
              <Animated.View
                key={index}
                entering={FadeInLeft.delay(700 + index * 120)}
                className="flex-row items-start py-2"
              >
                <Ionicons
                  name="ellipse"
                  size={7}
                  color={primary}
                  style={{ marginTop: 6 }}
                />

                <CsText className="text-gray-800 text-sm flex-1 ml-2 leading-5">
                  {item}
                </CsText>
              </Animated.View>
            ))}
          </Animated.View>
        </Animated.View>
      )}
    </Animated.View>
  );
}
