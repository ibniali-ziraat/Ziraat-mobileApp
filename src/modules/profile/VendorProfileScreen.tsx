import BackHeader from "@/src/components/shared/BackHeader";
import DetailsCard from "@/src/components/shared/DetailsCard";
import ProgressBar from "@/src/components/shared/ProgressBar";
import { colors } from "@/src/constants/colors";
import { useGlobalData } from "@/src/contexts/GlobalDataContext";
import { useProfileProgress } from "@/src/hooks/useProfileProgress";
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
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { vendorDeleteConfig } from "../auth/vendor/config/vendorDeleteConfig";
import { vendorRoutes } from "../auth/vendor/config/vendorRoutes";
import ProductItemCard from "./components/ProductItemCard";
import ProfileHeader from "./components/ProfileHeader";
import SectionCard from "./components/SectionCard";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import Loader from "@/src/components/shared/Loader";
import VendorProfileHeader from "@/src/components/shared/VendorProfileHeader";
import VendorProfileDetails from "@/src/components/shared/VendorProfileDetails";
import ProfileProgressBar from "@/src/components/shared/ProfileProgressBar";
import { useAuth } from "@/src/contexts/AuthContext";
import { ROUTES } from "@/src/constants/routes";
import { maskValue } from "@/src/utils/mask";
import ConfirmDeleteModal from "@/src/components/ui/ConfirmDeleteModal";

export default function VendorProfileScreen() {
  // const { vendorData, setVendorData } = useGlobalData();
  const { userId, setVendorProfileId, vendorProfileId } = useAuth();
  console.log(vendorProfileId, "vendorproifleidddd");

  const queryClient = useQueryClient();

  const { data: profileData, isPending: loadingVendorProfile } =
    useVendorProfileQuery(userId);
  const { data: licenseData, isPending: loadingLicense } =
    useVendorLicenseQuery(vendorProfileId);
  const { data: productsData, isPending: loadingProducts } =
    useVendorProductsQuery(vendorProfileId);
  const { data: operationsData, isPending: loadingOperations } =
    useVendorOperationsQuery(vendorProfileId);
  const { data: financialData, isPending: loadingFinancial } =
    useVendorFinancialQuery(vendorProfileId);
  const { data: supportData, isPending: loadingSupport } =
    useVendorSupportQuery(vendorProfileId);

  const { mutateAsync: deleteLicenseApi } = useVendorLicenseDeleteMutation();
  const { mutateAsync: deleteProductsApi } = useVendorProductsDeleteMutation();

  const [deleteSection, setDeleteSection] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { mutateAsync: deleteOperationsApi } =
    useVendorOperationsDeleteMutation();
  const { mutateAsync: deleteFinancialApi } =
    useVendorFinancialDeleteMutation();
  const { mutateAsync: deleteSupportApi } = useVendorSupportDeleteMutation();
  const { progress, missingSections } = useProfileProgress({
    business: profileData,
    license: licenseData,
    products: productsData,
    operations: operationsData,
    financial: financialData,
    support: supportData,
  });

  useEffect(() => {
    if (!profileData) return;
    setVendorProfileId(profileData?.id);
  }, [profileData]);

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

      // ⚡ OPTIMISTIC: Remove data instantly from cache
      queryClient.setQueryData([config.apiKey, vendorProfileId], null);

      // 🔥 Delete on server
      await api(vendorProfileId);

      showSuccessToast(config.success);

      // 🔄 Revalidate backend state
      // await queryClient.invalidateQueries({
      //   queryKey: [config.apiKey, vendorProfileId],
      // });
    } catch (err) {
      // console.error(err);
    }
  };

  const confirmDelete = async () => {
    if (!deleteSection) return;

    try {
      setDeleting(true);
      await handleDelete(deleteSection);
      setDeleteSection(null);
    } finally {
      setDeleting(false);
    }
  };

  if (!profileData || deleting) return <Loader />;

  return (
    <ScreenLayout>
      <BackHeader
        title="Profile"
        onPress={() => router.push(ROUTES.TABS.MENU)}
      />

      <VendorProfileHeader
        data={profileData}
        onEdit={() => goToSection("business")}
      />

      {progress < 100 && (
        <ProfileProgressBar
          progress={progress}
          missingSections={missingSections}
          completedSections={[
            "Business",
            "License",
            "Products",
            "Operations",
            "Financial",
            "Support",
          ].filter((s) => !missingSections.includes(s.toLowerCase()))}
        />
      )}

      <VendorProfileDetails data={profileData} />

      {/* <ProgressBar progress={progress} />

      {missingSections.length > 0 && (
        <Text style={{ color: "gray", marginBottom: 15 }}>
          Missing: {missingSections.join(", ")}
        </Text>
      )}
      <ProfileHeader
        data={profileData}
        onEdit={() => goToSection("business")}
      /> */}

      <SectionCard
        title="License & Compliance"
        onEdit={licenseData ? () => goToSection("license") : undefined}
        onDelete={licenseData ? () => setDeleteSection("license") : undefined}
        style={
          !licenseData ? { borderColor: colors.warning, borderWidth: 1 } : {}
        }
      >
        {licenseData ? (
          <>
            <DetailsCard
              title="GST"
              value={maskValue(licenseData.gstNumber, 2, 3)}
            />
            <DetailsCard
              title="License No."
              value={maskValue(licenseData.dealerLicenseNumber, 0, 4)}
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
            {/* <DetailsCard
              title="License Copy URL"
              value={licenseData.licenseCopyUrl}
            /> */}
            <DetailsCard
              title="PAN Number"
              value={maskValue(licenseData.panNumber, 2, 2)}
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
        onDelete={productsData ? () => setDeleteSection("products") : undefined}
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

            {/* --- Input Types as Product Items --- */}
            {/* {productsData.inputTypes.map((item) => (
              <ProductItemCard
                key={`type-${item.id}`}
                name={item.inputType}
                stock="Category"
                unit=""
              />
            ))} */}

            {/* --- Custom Inputs as Product Items --- */}
            {productsData.customInputs.length > 0 && (
              <>
                <Text className="font-semibold text-gray-700 mt-5 mb-2 text-base">
                  Other Inputs
                </Text>
                {productsData.customInputs.map((item) => (
                  <ProductItemCard
                    key={`custom-${item.id}`}
                    name={item.productName}
                    stock={item.stockQuantity || "Not Provided"}
                    unit={item.unit || ""}
                  />
                ))}
              </>
            )}
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
        onDelete={
          operationsData ? () => setDeleteSection("operations") : undefined
        }
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
        onDelete={
          financialData ? () => setDeleteSection("financial") : undefined
        }
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
            {financialData.sellingViaZiraat && (
              <>
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
                  value={
                    maskValue(financialData.bankDetails?.accountNumber, 3, 4) ||
                    "N/A"
                  }
                />

                <DetailsCard
                  title="IFSC Code"
                  value={
                    maskValue(financialData.bankDetails?.ifscCode, 4, 1) ||
                    "N/A"
                  }
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
            )}
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
        onDelete={supportData ? () => setDeleteSection("support") : undefined}
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
              value={supportData.fieldStaffCount || "N/A"}
            />

            <DetailsCard
              title="After Sales Service"
              value={supportData.afterSalesService || "N/A"}
            />

            <DetailsCard
              title="Preferred Delivery Range (sq. km)"
              value={
                supportData.deliveryRange
                  ? `${supportData.deliveryRange} sq.km`
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

      <ConfirmDeleteModal
        visible={!!deleteSection}
        title="Confirm deletion"
        description="Are you sure you want to delete this information?"
        onCancel={() => setDeleteSection(null)}
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </ScreenLayout>
  );
}
