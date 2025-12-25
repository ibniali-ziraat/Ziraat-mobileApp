import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  Pressable,
  TouchableOpacity,
  View
} from "react-native";

export default function TaxReportCard() {
  const [showModal, setShowModal] = useState(false);

  const taxable = 240200;
  const gstRate = 5;
  const gst = 12010;
  const total = taxable + gst;

  // CGST + SGST split
  const cgst = gst / 2;
  const sgst = gst / 2;

  const gstPercent = Math.round((gst / total) * 100);

  // PDF handler (placeholder)
  const handleDownloadPDF = () => {
    console.log("Generate PDF here...");
    // You can integrate react-native-pdf or backend API
  };

  return (
    <>
      {/* MAIN CARD */}
      <View
        className=" rounded-2xl mb-4"
        style={{
         

          shadowOpacity: 0.06,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
        }}
      >
        {/* HEADER */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
           
            >
              <Ionicons
                name="receipt-outline"
                size={22}
                color={colors.secondary}
              />
            </View>
            <CsText className="text-lg font-bold text-gray-900">
              Tax Report (GST)
           </CsText>
          </View>

          {/* PDF DOWNLOAD BUTTON */}
          <TouchableOpacity
            onPress={handleDownloadPDF}
            className="px-3 py-2 rounded-full flex-row items-center"
            
          >
            <Ionicons name="download-outline" size={22} color={colors.secondary} />
            <CsText
              className="ml-2 text-sm font-semibold"
              style={{ color: colors.secondary }}
            >
              PDF
           </CsText>
          </TouchableOpacity>
        </View>

        {/* TAXABLE AMOUNT */}
        <View className="flex-row justify-between items-center mb-4">
          <CsText className="text-sm text-gray-700">Taxable Amount</CsText>
          <CsText className="text-base font-semibold text-gray-900">
            ₹{taxable.toLocaleString("en-IN")}
         </CsText>
        </View>

        {/* TOTAL GST */}
        <View className="flex-row justify-between items-center mb-3">
          <View className="flex-row items-center">
            <Ionicons
              name="trending-up-outline"
              size={22}
              color={colors.primary}
            />
            <CsText className="text-sm text-black ml-2">
              GST ({gstRate}%)
           </CsText>
          </View>
          <CsText className="text-base font-semibold text-black">
            ₹{gst.toLocaleString("en-IN")}
         </CsText>
        </View>

        {/* GST PROGRESS BAR */}
        <View className="mt-1 mb-4">
          <View className="h-1 rounded-full bg-black">
            <View
              className="h-1 rounded-full"
              style={{
                width: `${gstPercent}%`,
                backgroundColor: colors.primary,
              }}
            />
          </View>

          <CsText className="text-[11px] text-black mt-1">
            GST forms {gstPercent}% of total
         </CsText>
        </View>

        {/* CGST + SGST SPLIT */}
        <View className="flex-row justify-between mb-4">
          <View className="flex-1 mr-2 p-3 rounded-xl bg-gray-100">
            <CsText className="text-xs text-gray-600">CGST (2.5%)</CsText>
            <CsText className="text-base font-semibold text-black mt-1">
              ₹{cgst.toLocaleString("en-IN")}
           </CsText>
          </View>

          <View className="flex-1 ml-2 p-3 rounded-xl bg-gray-100">
            <CsText className="text-xs text-gray-600">SGST (2.5%)</CsText>
            <CsText className="text-base font-semibold text-black mt-1">
              ₹{sgst.toLocaleString("en-IN")}
           </CsText>
          </View>
        </View>

        {/* DIVIDER */}
        <View className="my-4 h-[1px] bg-gray-200" />

        {/* TOTAL AFTER GST */}
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          className="p-4 rounded-xl flex-row justify-between items-center"
          style={{
            backgroundColor: colors.darkHover,
           
          }}
        >
          <CsText className="text-sm font-semibold text-gray-800">
            Total After GST
         </CsText>
          <CsText className="text-xl font-extrabold" style={{ color: colors.primary }}>
            ₹{total.toLocaleString("en-IN")}
         </CsText>
        </TouchableOpacity>
      </View>

      {/* FULL BREAKDOWN MODAL */}
      <Modal visible={showModal} animationType="slide" transparent>
        <Pressable
          className="flex-1 bg-black/40 justify-end"
          onPress={() => setShowModal(false)}
        >
          <Pressable
            className="bg-white rounded-t-3xl p-6"
            onPress={() => {}}
          >
            <CsText className="text-lg font-bold text-gray-900 mb-4">
              Full Tax Breakdown
           </CsText>

            <View className="mb-4">
              <CsText className="text-gray-600 text-sm">Taxable Amount</CsText>
              <CsText className="text-base font-semibold mt-1">
                ₹{taxable.toLocaleString("en-IN")}
             </CsText>
            </View>

            <View className="mb-4">
              <CsText className="text-gray-600 text-sm">GST (5%)</CsText>
              <CsText className="text-base font-semibold mt-1">
                ₹{gst.toLocaleString("en-IN")}
             </CsText>
            </View>

            <View className="flex-row justify-between mb-4">
              <View>
                <CsText className="text-gray-600 text-sm">CGST</CsText>
                <CsText className="text-base font-semibold mt-1">
                  ₹{cgst.toLocaleString("en-IN")}
               </CsText>
              </View>

              <View>
                <CsText className="text-gray-600 text-sm">SGST</CsText>
                <CsText className="text-base font-semibold mt-1">
                  ₹{sgst.toLocaleString("en-IN")}
               </CsText>
              </View>
            </View>

            {/* Grand Total */}
            <View className="p-4 rounded-xl bg-gray-100 mt-3">
              <CsText className="text-gray-700 text-sm">Grand Total</CsText>
              <CsText className="mt-1 text-xl font-bold text-gray-900">
                ₹{total.toLocaleString("en-IN")}
             </CsText>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
