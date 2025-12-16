import BackHeader from "@/src/components/shared/BackHeader";
import Loader from "@/src/components/shared/Loader";
import ProfileProgressBar from "@/src/components/shared/ProfileProgressBar";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import VendorProfileDetails from "@/src/components/shared/VendorProfileDetails";
import VendorProfileHeader from "@/src/components/shared/VendorProfileHeader";
import { useAuth } from "@/src/contexts/AuthContext";
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


import DetailCard from "@/src/components/shared/DetailsCard";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import { BadgeCheck, Boxes, Headset, Wallet, Workflow } from "lucide-react-native";
import { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { vendorDeleteConfig } from "../auth/vendor/config/vendorDeleteConfig";
import { vendorRoutes } from "../auth/vendor/config/vendorRoutes";
import ProductItemCard from "./components/ProductItemCard";
import SectionCard from "./components/SectionCard";

export default function VendorProfileScreen() {
  // const { vendorData, setVendorData } = useGlobalData();
  const { userId, setVendorProfileId, vendorProfileId } = useAuth()
  console.log(vendorProfileId, "vendorproifleidddd");



  const queryClient = useQueryClient();

  const { data: profileData, isPending: loadingVendorProfile } = useVendorProfileQuery(userId);
  const { data: licenseData } = useVendorLicenseQuery(vendorProfileId);
  const { data: productsData } = useVendorProductsQuery(vendorProfileId);
  const { data: operationsData } = useVendorOperationsQuery(
    vendorProfileId
  );

  const { data: financialData } = useVendorFinancialQuery(vendorProfileId);
  const { data: supportData } = useVendorSupportQuery(vendorProfileId);

  const { mutateAsync: deleteLicenseApi } = useVendorLicenseDeleteMutation();
  const { mutateAsync: deleteProductsApi } = useVendorProductsDeleteMutation();
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
    setVendorProfileId(profileData?.id)
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

  if (!profileData) return <Loader />;

  return (

    <ScreenLayout>
      <BackHeader title="Profile" />

      <VendorProfileHeader data={profileData}
        onEdit={() => goToSection("business")}
      />

      {progress < 100 && (
        <ProfileProgressBar
          progress={progress}
          missingSections={missingSections}
          completedSections={["Business", "License", "Products", "Operations", "Financial", "Support"].filter(
            (s) => !missingSections.includes(s.toLowerCase())
          )}
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




{/* LICENSE & COMPLIANCE */}
<ZiraatCard width="100%"  paddingHorizontal={1}

>
  
  <SectionCard
    title="License & Compliance"
     icon={<BadgeCheck size={22} color={colors.primary} />}
    onEdit={licenseData ? () => goToSection("license") : undefined}
    onDelete={licenseData ? () => handleDelete("license") : undefined}
  >
    {licenseData ? (
      <>
        <DetailCard title="GST" value={licenseData.gstNumber} />
        <DetailCard title="License No." value={licenseData.dealerLicenseNumber} />
        <DetailCard
          title="License Start Date"
          value={new Date(licenseData.licenseStartDate).toLocaleDateString()}
        />
        <DetailCard
          title="License Expiry Date"
          value={new Date(licenseData.licenseExpiryDate).toLocaleDateString()}
        />
        {/* <DetailCard title="License Copy URL" value={licenseData.licenseCopyUrl} /> */}
        <DetailCard title="PAN Number" value={licenseData.panNumber} />
      </>
    ) : (
      <TouchableOpacity onPress={() => goToSection("license")}>
        <Text style={{ color: colors.primary, fontWeight: "600" }}>
          + Add License Details
        </Text>
      </TouchableOpacity>
    )}
  </SectionCard>
</ZiraatCard>

{/* PRODUCT PORTFOLIO */}
<ZiraatCard 

width="100%" 
marginVertical={1} 
paddingHorizontal={1} >
  
  <SectionCard
    title="Product Portfolio"
    icon={<Boxes size={22} color={colors.primary}/>}
    onEdit={productsData ? () => goToSection("products") : undefined}
    onDelete={productsData ? () => handleDelete("products") : undefined}
  >
    {productsData ? (
      <>
        <DetailCard
          title="Storage Capacity"
          value={`${productsData.storageCapacityValue || ""} ${
            productsData.storageCapacityUnit || ""
          }`.trim()}
        />

        <DetailCard
          title="Input Types"
          value={
            productsData.inputTypes?.map((i) => i.inputType).join(", ") || "N/A"
          }
        />

        <DetailCard
          title="Major Brands"
          value={
            productsData.majorBrands?.map((b) => b.brandName).join(", ") || "N/A"
          }
        />

        <Text className="font-semibold text-gray-700 mt-5 mb-2 text-base">
          Products
        </Text>

        {productsData.inputTypes.map((item) => (
          <ProductItemCard
            key={`type-${item.id}`}
            name={item.inputType}
            stock="Category"
            unit=""
          />
        ))}

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
</ZiraatCard>

{/* OPERATIONS */}
<ZiraatCard 

width="100%" 
paddingHorizontal={1}
 
>
  <SectionCard
    title="Operations"
 icon={<Workflow size={22} color={colors.primary} />}

    onEdit={operationsData ? () => goToSection("operations") : undefined}
    onDelete={operationsData ? () => handleDelete("operations") : undefined}
  >
    {operationsData ? (
      <>
        <DetailCard title="Years in Business" value={operationsData.yearsInBusiness || "N/A"} />
        <DetailCard
          title="Delivery Service Available"
          value={operationsData.deliveryServiceAvailable ? "Yes" : "No"}
        />
        <DetailCard
          title="Avg. Monthly Sales Volume"
          value={operationsData.avgMonthlySalesVolume || "N/A"}
        />
        <DetailCard
          title="Service Areas"
          value={operationsData.serviceAreas?.map((i) => i.placeName).join(", ") || "N/A"}
        />

        <Text className="font-semibold text-gray-700 mt-4 mb-2 text-base">
          Company Tie-ups
        </Text>

        {operationsData.companyTieups?.map((tie) => (
          <DetailCard key={tie.id} title="Company" value={tie.name} />
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
</ZiraatCard>

{/* FINANCIAL INFO */}
<ZiraatCard width="100%"  marginTop={1} paddingHorizontal={1}>
  <SectionCard
    title="Financial Info"
     icon={<Wallet size={22} color={colors.primary} />}
    onEdit={financialData ? () => goToSection("financial") : undefined}
    onDelete={financialData ? () => handleDelete("financial") : undefined}
  >
    {financialData ? (
      <>
        <DetailCard title="UPI Available" value={financialData.upiAvailable ? "Yes" : "No"} />
        <DetailCard
          title="Credit Facility"
          value={financialData.creditFacility ? "Yes" : "No"}
        />
        <DetailCard
          title="Selling via Ziraat"
          value={financialData.sellingViaZiraat ? "Yes" : "No"}
        />

        <Text className="font-semibold text-gray-700 mt-4 mb-2 text-base">
          Bank Details
        </Text>

        <DetailCard title="Account Holder Name" value={financialData.bankDetails?.accountHolderName || "N/A"} />
        <DetailCard title="Account Number" value={financialData.bankDetails?.accountNumber || "N/A"} />
        <DetailCard title="IFSC Code" value={financialData.bankDetails?.ifscCode || "N/A"} />
        <DetailCard title="Bank Name" value={financialData.bankDetails?.bankName || "N/A"} />
        <DetailCard title="Branch Name" value={financialData.bankDetails?.branchName || "N/A"} />
      </>
    ) : (
      <TouchableOpacity onPress={() => goToSection("financial")}>
        <Text style={{ color: colors.primary, fontWeight: "600" }}>
          + Add Financial Details
        </Text>
      </TouchableOpacity>
    )}
  </SectionCard>
</ZiraatCard>

{/* SUPPORT SERVICES */}
<ZiraatCard width="100%" height="7%" marginTop={1} paddingHorizontal={1}>
  <SectionCard
    title="Support Services"
     icon={<Headset size={22} color={colors.primary} />}
    onEdit={supportData ? () => goToSection("support") : undefined}
    onDelete={supportData ? () => handleDelete("support") : undefined}
  >
    {supportData ? (
      <>
        <DetailCard
          title="Agronomy Advisory Support"
          value={supportData.agronomyAdvisorySupport ? "Yes" : "No"}
        />
        <DetailCard
          title="Field Staff Available"
          value={supportData.fieldStaffAvailable ? "Yes" : "No"}
        />
        <DetailCard
          title="Number of Field Staff"
          value={supportData.fieldStaffCount || "N/A"}
        />
        <DetailCard
          title="After Sales Service"
          value={supportData.afterSalesService || "N/A"}
        />
        <DetailCard
          title="Preferred Delivery Range (sq. km)"
          value={supportData.deliveryRange ? `${supportData.deliveryRange} sq.km` : "N/A"}
        />
        <DetailCard
          title="Computer Facility Available"
          value={supportData.computerFacilityAvailable ? "Yes" : "No"}
        />
        <DetailCard
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
</ZiraatCard>


    </ScreenLayout>
  );
}
