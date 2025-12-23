import BackHeader from "@/src/components/shared/BackHeader";
import Loader from "@/src/components/shared/Loader";
import ProfileProgressBar from "@/src/components/shared/ProfileProgressBar";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
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

import ConfirmDeleteModal from "@/src/components/ui/ConfirmDeleteModal";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { maskValue } from "@/src/utils/mask";
import {
  BadgeCheck,
  Boxes,
  Building,
  Building2,
  CreditCard,
  GitBranch,
  Hash,
  Headset,
  Landmark,
  Mail,
  MapPin,
  Navigation,
  Phone,
  User,
  UserCheck,
  Wallet,
  Workflow,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { vendorDeleteConfig } from "../auth/vendor/config/vendorDeleteConfig";
import { vendorRoutes } from "../auth/vendor/config/vendorRoutes";
import DetailsCard from "./components/DetailsCard";

export default function VendorProfileScreen() {
  // const { vendorData, setVendorData } = useGlobalData();
  const { userId, setVendorProfileId, vendorProfileId } = useAuth();
  console.log(vendorProfileId, "vendorproifleidddd");
  const [deleteSection, setDeleteSection] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const queryClient = useQueryClient();

  const { data: profileData, isPending: loadingVendorProfile } =
    useVendorProfileQuery(userId);
  const { data: licenseData } = useVendorLicenseQuery(vendorProfileId);
  const { data: productsData } = useVendorProductsQuery(vendorProfileId);
  const { data: operationsData } = useVendorOperationsQuery(vendorProfileId);

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

  if (!profileData) return <Loader />;
  console.log(financialData, "finncialdata");

  return (
    <ScreenLayout>
      <BackHeader
        title="Profile"
        onPress={() => router.replace(ROUTES.TABS.MENU)}
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

      {/* <VendorProfileDetails
        data={profileData}
        onEdit={() => goToSection("business")}
      /> */}
      <DetailsCard
        heading="Business Details"
        items={
          profileData
            ? [
                {
                  title: "Shop Name",
                  value: profileData.shopName,
                  icon: <Workflow size={22} color={colors.primary} />,
                },
                {
                  title: "Owner Name",
                  value: profileData.ownerName,
                  icon: <UserCheck size={22} color={colors.primary} />,
                },
                {
                  title: "Primary Contact",
                  value: profileData.contactNumberPrimary,
                  icon: <Phone size={22} color={colors.primary} />,
                },
                {
                  title: "Alternate Contact",
                  value: profileData.contactNumberAlternate,
                  icon: <Phone size={22} color={colors.primary} />,
                },
                {
                  title: "Email",
                  value: profileData.email,
                  icon: <Mail size={22} color={colors.primary} />,
                },
                {
                  title: "State",
                  value: profileData.state,
                  icon: <MapPin size={22} color={colors.primary} />,
                },
                {
                  title: "District",
                  value: profileData.district,
                  icon: <Building size={22} color={colors.primary} />,
                },
                {
                  title: "Tehsil",
                  value: profileData.tehsil,
                  icon: <Navigation size={22} color={colors.primary} />,
                },
                {
                  title: "Shop Address",
                  value: profileData.village,
                  icon: <Building2 size={22} color={colors.primary} />,
                },
                {
                  title: "Pincode",
                  value: profileData.pincode,
                  icon: <MapPin size={22} color={colors.primary} />,
                },
              ]
            : []
        }
        onEdit={() => goToSection("business")}
      />

      {/* <ProgressBar progress={progress} />

      {missingSections.length > 0 && (
        <CsText style={{ color: "gray", marginBottom: 15 }}>
          Missing: {missingSections.join(", ")}
       </CsText>
      )}
      <ProfileHeader
        data={profileData}
        onEdit={() => goToSection("business")}
      /> */}
      <DetailsCard
        heading="License & Compliance"
        items={
          licenseData
            ? [
                {
                  title: "GST Number",
                  value: maskValue(licenseData.gstNumber, 2, 4),
                  icon: <BadgeCheck size={22} color={colors.primary} />,
                },
                {
                  title: "License Number",
                  value: maskValue(licenseData.dealerLicenseNumber, 4, 2),
                  icon: <BadgeCheck size={22} color={colors.primary} />,
                },
                {
                  title: "License Start Date",
                  value: new Date(
                    licenseData.licenseStartDate
                  ).toLocaleDateString(),
                  icon: <BadgeCheck size={22} color={colors.primary} />,
                },
                {
                  title: "License Expiry Date",
                  value: new Date(
                    licenseData.licenseExpiryDate
                  ).toLocaleDateString(),
                  icon: <BadgeCheck size={22} color={colors.primary} />,
                },
                {
                  title: "PAN Number",
                  value: maskValue(licenseData.panNumber, 2, 1),
                  icon: <BadgeCheck size={22} color={colors.primary} />,
                },
              ]
            : []
        }
        onEdit={licenseData ? () => goToSection("license") : undefined}
        onDelete={licenseData ? () => setDeleteSection("license") : undefined}
        onAdd={() => goToSection("license")}
        emptyActionLabel="Add License Details"
      />

      <DetailsCard
        heading="Product Portfolio"
        items={
          productsData
            ? [
                {
                  title: "Input Types",
                  value:
                    productsData.inputTypes
                      ?.map((i) => i.inputType)
                      .join(", ") || "N/A",
                  icon: <Boxes size={22} color={colors.primary} />,
                },
                {
                  title: "Major Brands",
                  value:
                    productsData.majorBrands
                      ?.map((b) => b.brandName)
                      .join(", ") || "N/A",
                  icon: <Boxes size={22} color={colors.primary} />,
                },
                {
                  title: "Storage Capacity",
                  value: `${productsData.storageCapacityValue || ""} ${
                    productsData.storageCapacityUnit || ""
                  }`.trim(),
                  icon: <Boxes size={22} color={colors.primary} />,
                },
              ]
            : []
        }
        onEdit={productsData ? () => goToSection("products") : undefined}
        onDelete={productsData ? () => setDeleteSection("products") : undefined}
        onAdd={() => goToSection("products")}
        emptyActionLabel="Add Products"
      />

      {/* OPERATIONS */}
      <DetailsCard
        heading="Operations"
        items={
          operationsData
            ? [
                {
                  title: "Years in Business",
                  value: operationsData.yearsInBusiness || "N/A",
                  icon: <Workflow size={22} color={colors.primary} />,
                },
                {
                  title: "Delivery Service",
                  value: operationsData.deliveryServiceAvailable ? "Yes" : "No",
                  icon: <Workflow size={22} color={colors.primary} />,
                },
                {
                  title: "Avg Monthly Sales",
                  value: operationsData.avgMonthlySalesVolume || "N/A",
                  icon: <Workflow size={22} color={colors.primary} />,
                },
                {
                  title: "Service Areas",
                  value:
                    operationsData.serviceAreas
                      ?.map((i) => i.placeName)
                      .join(", ") || "N/A",
                  icon: <Workflow size={22} color={colors.primary} />,
                },
              ]
            : []
        }
        onEdit={operationsData ? () => goToSection("operations") : undefined}
        onDelete={
          operationsData ? () => setDeleteSection("operations") : undefined
        }
        onAdd={() => goToSection("operations")}
        emptyActionLabel="Add Operational Details"
      />

      {/* <DetailsCard
        heading="Financial Info"
        items={
          financialData
            ? [
                {
                  title: "UPI Available",
                  value: financialData.upiAvailable ? "Yes" : "No",
                  icon: <Wallet size={22} color={colors.primary} />,
                },
                {
                  title: "Credit Facility",
                  value: financialData.creditFacility ? "Yes" : "No",
                  icon: <Wallet size={22} color={colors.primary} />,
                },
              ]
            : []
        }
        onEdit={financialData ? () => goToSection("financial") : undefined}
        onDelete={
          financialData ? () => setDeleteSection("financial") : undefined
        }
        onAdd={() => goToSection("financial")}
        emptyActionLabel="Add Financial Details"
      /> */}

      <DetailsCard
        heading="Financial Info"
        items={
          financialData
            ? [
                {
                  title: "UPI Available",
                  value: financialData.upiAvailable ? "Yes" : "No",
                  icon: <Wallet size={22} color={colors.primary} />,
                },
                {
                  title: "Credit Facility",
                  value: financialData.creditFacility ? "Yes" : "No",
                  icon: <Wallet size={22} color={colors.primary} />,
                },
                // {
                //   title: "Selling via Ziraat",
                //   value: financialData.sellingViaZiraat ? "Yes" : "No",
                //   icon: <Store size={22} color={colors.primary} />,
                // },

                // ---- Bank Details ----
                ...(financialData.bankDetails
                  ? [
                      {
                        title: "Bank Name",
                        value: financialData.bankDetails.bankName,
                        icon: <Landmark size={22} color={colors.primary} />,
                      },
                      {
                        title: "Branch Name",
                        value: financialData.bankDetails.branchName,
                        icon: <GitBranch size={22} color={colors.primary} />,
                      },
                      {
                        title: "Account Holder Name",
                        value: financialData.bankDetails.accountHolderName,
                        icon: <User size={22} color={colors.primary} />,
                      },
                      {
                        title: "Account Number",
                        value: maskValue(
                          financialData.bankDetails.accountNumber,
                          4,
                          6
                        ),
                        icon: <CreditCard size={22} color={colors.primary} />,
                      },
                      {
                        title: "IFSC Code",
                        value: maskValue(
                          financialData.bankDetails.ifscCode,
                          4,
                          1
                        ),
                        icon: <Hash size={22} color={colors.primary} />,
                      },
                    ]
                  : []),
              ]
            : []
        }
        onEdit={financialData ? () => goToSection("financial") : undefined}
        onDelete={
          financialData ? () => setDeleteSection("financial") : undefined
        }
        onAdd={() => goToSection("financial")}
        emptyActionLabel="Add Financial Details"
      />

      <DetailsCard
        heading="Support Services"
        items={
          supportData
            ? [
                {
                  title: "Agronomy Advisory",
                  value: supportData.agronomyAdvisorySupport ? "Yes" : "No",
                  icon: <Headset size={22} color={colors.primary} />,
                },
                {
                  title: "Field Staff Available",
                  value: supportData.fieldStaffAvailable ? "Yes" : "No",
                  icon: <Headset size={22} color={colors.primary} />,
                },
                {
                  title: "Field Staff Count",
                  value: supportData.fieldStaffCount || "N/A",
                  icon: <Headset size={22} color={colors.primary} />,
                },
                {
                  title: "After Sales Service",
                  value: supportData.afterSalesService || "N/A",
                  icon: <Headset size={22} color={colors.primary} />,
                },
              ]
            : []
        }
        onEdit={supportData ? () => goToSection("support") : undefined}
        onDelete={supportData ? () => setDeleteSection("support") : undefined}
        onAdd={() => goToSection("support")}
        emptyActionLabel="Add Support Info"
      />

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
