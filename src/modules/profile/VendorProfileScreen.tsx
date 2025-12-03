import BackHeader from "@/src/components/shared/BackHeader";
import DetailsCard from "@/src/components/shared/DetailsCard";
import { colors } from "@/src/constants/colors";
import { useAuth } from "@/src/contexts/AuthContext";
import {
  useVendorFinancialDeleteMutation,
  useVendorFinancialQuery,
  useVendorLicenseDeleteMutation,
  useVendorLicenseQuery,
  useVendorOperationsDeleteMutation,
  useVendorOperationsQuery,
  useVendorProductsDeleteMutation,
  useVendorProductsQuery,
  useVendorProfileQuery,
  useVendorSupportDeleteMutation,
  useVendorSupportQuery,
} from "@/src/hooks/vendorQueryHooks";
import { showSuccessToast } from "@/src/utils/toast";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { vendorDeleteConfig } from "../auth/vendor/config/vendorDeleteConfig";
import { vendorRoutes } from "../auth/vendor/config/vendorRoutes";
import ProductItemCard from "./components/ProductItemCard";
import ProfileHeader from "./components/ProfileHeader";
import SectionCard from "./components/SectionCard";

export default function VendorProfileScreen() {
  const { vendorId } = useAuth();
  const queryClient = useQueryClient();

  const { data: profileData } = useVendorProfileQuery(vendorId);
  const { data: licenseData } = useVendorLicenseQuery(vendorId);
  const { data: productsData } = useVendorProductsQuery(vendorId);
  const { data: operationsData } = useVendorOperationsQuery(vendorId);
  const { data: financialData } = useVendorFinancialQuery(vendorId);
  const { data: supportData } = useVendorSupportQuery(vendorId);

  const { mutateAsync: deleteLicenseApi } = useVendorLicenseDeleteMutation();
  const { mutateAsync: deleteProductsApi } = useVendorProductsDeleteMutation();
  const { mutateAsync: deleteOperationsApi } =
    useVendorOperationsDeleteMutation();
  const { mutateAsync: deleteFinancialApi } =
    useVendorFinancialDeleteMutation();
  const { mutateAsync: deleteSupportApi } = useVendorSupportDeleteMutation();

  const goToSection = (section: VendorRouteKey) => {
    router.push(vendorRoutes[section]);
  };

  const deleteActions = {
    license: deleteLicenseApi,
    products: deleteProductsApi,
    operations: deleteOperationsApi,
    financial: deleteFinancialApi,
    support: deleteSupportApi,
  };

  const handleDelete = async (section: keyof typeof vendorDeleteConfig) => {
    try {
      const config = vendorDeleteConfig[section];
      const api = deleteActions[section];

      await api(vendorId);
      showSuccessToast(config.success);

      queryClient.invalidateQueries([config.apiKey, vendorId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <BackHeader>Vendor Profile</BackHeader>

      <ProfileHeader
        profileData={profileData}
        onEdit={() => goToSection("business")}
      />

      <SectionCard
        title="License & Compliance"
        onEdit={licenseData ? () => goToSection("license") : undefined}
        onDelete={licenseData ? () => handleDelete("license") : undefined}
        style={
          !licenseData ? { borderColor: colors.warning, borderWidth: 1 } : {}
        }
      >
        {licenseData ? (
          <>
            <DetailsCard title="GST" value={licenseData.gstNumber} />
            <DetailsCard
              title="License No."
              value={licenseData.dealerLicenseNumber}
            />
            <DetailsCard
              title="License Start Date"
              value={new Date(
                licenseData.licenseStartDate
              ).toLocaleDateString()}
            />
            <DetailsCard
              title="License Expiry Date"
              value={new Date(
                licenseData.licenseExpiryDate
              ).toLocaleDateString()}
            />
            <DetailsCard
              title="License Copy URL"
              value={licenseData.licenseCopyUrl}
            />
            <DetailsCard title="PAN Number" value={licenseData.panNumber} />
            <DetailsCard
              title="Supplier Profile ID"
              value={licenseData.supplierProfileId}
            />
          </>
        ) : (
          <TouchableOpacity onPress={() => goToSection("license")}>
            <Text style={{ color: colors.primary, fontWeight: "600" }}>
              + Add License Details
            </Text>
          </TouchableOpacity>
        )}
      </SectionCard>

      <SectionCard
        title="Product Portfolio"
        onEdit={productsData ? () => goToSection("products") : undefined}
        onDelete={!productsData ? () => handleDelete("products") : undefined}
        style={
          !productsData ? { borderColor: colors.warning, borderWidth: 1 } : {}
        }
      >
        {productsData ? (
          <>
            {/* STORAGE CAPACITY */}
            <DetailsCard
              title="Storage Capacity"
              value={
                `${productsData.storageCapacityValue || ""} ${
                  productsData.storageCapacityUnit || ""
                }`.trim() || "N/A"
              }
            />

            {/* INPUT TYPES */}
            <DetailsCard
              title="Input Types"
              value={
                productsData.inputTypes?.map((i) => i.inputType).join(", ") ||
                "N/A"
              }
            />

            {/* MAJOR BRANDS */}
            <DetailsCard
              title="Major Brands"
              value={
                productsData.majorBrands?.map((b) => b.brandName).join(", ") ||
                "N/A"
              }
            />

            {/* PRODUCT LIST */}
            <Text className="font-semibold text-gray-700 mt-5 mb-2 text-base">
              Products
            </Text>

            {/* --- Input Types as Product Items --- */}
            {productsData.inputTypes.map((item) => (
              <ProductItemCard
                key={`type-${item.id}`}
                name={item.inputType}
                stock="Category"
                unit=""
              />
            ))}

            {/* --- Custom Inputs as Product Items --- */}
            {productsData.customInputs.map((item) => (
              <ProductItemCard
                key={`custom-${item.id}`}
                name={item.productName}
                stock={item.stockQuantity || "Not Provided"}
                unit={item.unit || ""}
              />
            ))}
          </>
        ) : (
          <TouchableOpacity onPress={() => goToSection("products")}>
            <Text style={{ color: colors.primary, fontWeight: "600" }}>
              + Add Products
            </Text>
          </TouchableOpacity>
        )}
      </SectionCard>

      <SectionCard
        title="Operations"
        onEdit={operationsData ? () => goToSection("operations") : undefined}
        onDelete={operationsData ? () => handleDelete("operations") : undefined}
        style={
          !operationsData ? { borderColor: colors.warning, borderWidth: 1 } : {}
        }
      >
        {operationsData ? (
          <>
            {/* YEARS IN BUSINESS */}
            <DetailsCard
              title="Years in Business"
              value={operationsData.yearsInBusiness || "N/A"}
            />

            {/* DELIVERY SERVICE */}
            <DetailsCard
              title="Delivery Service Available"
              value={operationsData.deliveryServiceAvailable ? "Yes" : "No"}
            />

            {/* MONTHLY SALES */}
            <DetailsCard
              title="Avg. Monthly Sales Volume"
              value={operationsData.avgMonthlySalesVolume || "N/A"}
            />

            {/* SERVICE AREAS */}
            <DetailsCard
              title="Service Areas"
              value={
                operationsData.serviceAreas
                  ?.map((i) => i.placeName)
                  .join(", ") || "N/A"
              }
            />

            {/* COMPANY TIEUPS */}
            <Text className="font-semibold text-gray-700 mt-4 mb-2 text-base">
              Company Tie-ups
            </Text>

            {operationsData.companyTieups?.map((tie) => (
              <DetailsCard key={tie.id} title="Company" value={tie.name} />
            ))}
          </>
        ) : (
          <TouchableOpacity onPress={() => goToSection("operations")}>
            <Text style={{ color: colors.primary, fontWeight: "600" }}>
              + Add Operational Details
            </Text>
          </TouchableOpacity>
        )}
      </SectionCard>

      <SectionCard
        title="Financial Info"
        onEdit={financialData ? () => goToSection("financial") : undefined}
        onDelete={financialData ? () => handleDelete("financial") : undefined}
        style={
          !financialData ? { borderColor: colors.warning, borderWidth: 1 } : {}
        }
      >
        {financialData ? (
          <>
            {/* UPI AVAILABLE */}
            <DetailsCard
              title="UPI Available"
              value={financialData.upiAvailable ? "Yes" : "No"}
            />

            {/* CREDIT FACILITY */}
            <DetailsCard
              title="Credit Facility"
              value={financialData.creditFacility ? "Yes" : "No"}
            />

            {/* SELLING VIA ZIRAAT */}
            <DetailsCard
              title="Selling via Ziraat"
              value={financialData.sellingViaZiraat ? "Yes" : "No"}
            />

            {/* BANK DETAILS */}
            <Text className="font-semibold text-gray-700 mt-4 mb-2 text-base">
              Bank Details
            </Text>

            <DetailsCard
              title="Account Holder Name"
              value={financialData.bankDetails?.accountHolderName || "N/A"}
            />

            <DetailsCard
              title="Account Number"
              value={financialData.bankDetails?.accountNumber || "N/A"}
            />

            <DetailsCard
              title="IFSC Code"
              value={financialData.bankDetails?.ifscCode || "N/A"}
            />

            <DetailsCard
              title="Bank Name"
              value={financialData.bankDetails?.bankName || "N/A"}
            />

            <DetailsCard
              title="Branch Name"
              value={financialData.bankDetails?.branchName || "N/A"}
            />
          </>
        ) : (
          <TouchableOpacity onPress={() => goToSection("financial")}>
            <Text style={{ color: colors.primary, fontWeight: "600" }}>
              + Add Financial Details
            </Text>
          </TouchableOpacity>
        )}
      </SectionCard>

      <SectionCard
        title="Support Services"
        onEdit={supportData ? () => goToSection("support") : undefined}
        onDelete={supportData ? () => handleDelete("support") : undefined}
        style={
          !supportData ? { borderColor: colors.warning, borderWidth: 1 } : {}
        }
      >
        {supportData ? (
          <>
            <DetailsCard
              title="Agronomy Advisory Support"
              value={supportData.agronomyAdvisorySupport ? "Yes" : "No"}
            />

            <DetailsCard
              title="Field Staff Available"
              value={supportData.fieldStaffAvailable ? "Yes" : "No"}
            />

            <DetailsCard
              title="Number of Field Staff"
              value={supportData.numberOfStaff || "N/A"}
            />

            <DetailsCard
              title="After Sales Service"
              value={supportData.afterSalesService || "N/A"}
            />

            <DetailsCard
              title="Preferred Delivery Range (sq. km)"
              value={
                supportData.preferredDeliveryAreaRangeSqKm
                  ? `${supportData.preferredDeliveryAreaRangeSqKm} sq.km`
                  : "N/A"
              }
            />

            <DetailsCard
              title="Computer Facility Available"
              value={supportData.computerFacilityAvailable ? "Yes" : "No"}
            />

            <DetailsCard
              title="Delivery Vehicle Available"
              value={supportData.deliveryVehicleAvailable ? "Yes" : "No"}
            />
          </>
        ) : (
          <TouchableOpacity onPress={() => goToSection("support")}>
            <Text style={{ color: colors.primary, fontWeight: "600" }}>
              + Add Support Info
            </Text>
          </TouchableOpacity>
        )}
      </SectionCard>
    </ScrollView>
  );
}
