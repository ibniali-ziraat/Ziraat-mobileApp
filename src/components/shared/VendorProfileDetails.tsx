import { View } from "react-native";
import DetailCard from "@/src/components/shared/DetailsCard";

interface VendorProfileDetailsProps {
    data: {
        email?: string;
        contactNumberPrimary?: string;
        contactNumberAlternate?: string;
        village?: string;
        tehsil?: string;
        district?: string;
        state?: string;
        pincode?: string;
    };
}

export default function VendorProfileDetails({ data }: VendorProfileDetailsProps) {
    return (
        <View className="w-full space-y-3 mb-4">
            <DetailCard title="Email" value={data?.email || "N/A"} />
            <DetailCard title="Primary Phone" value={data?.contactNumberPrimary || "N/A"} />
            {data?.contactNumberAlternate && (
                <DetailCard title="Alternate Phone" value={data.contactNumberAlternate} />
            )}
            <DetailCard
                title="Address"
                value={`${data?.village || ""}, ${data?.tehsil || ""}, ${data?.district || ""}, ${data?.state || ""} - ${data?.pincode || ""}`}
            />
        </View>
    );
}
