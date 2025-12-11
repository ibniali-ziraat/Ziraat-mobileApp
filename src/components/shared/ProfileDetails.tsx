import { default as DetailCard } from "@/src/components/shared/DetailsCard";
import { View } from "react-native";

interface ProfileDetailsProps {
    email?: string;
    phone?: string;
    age?: number;
    gender?: string;
    createdOn?: string;
}

export default function ProfileDetails({ email, phone, age, gender, createdOn }: ProfileDetailsProps) {
    return (
        <View className="w-full space-y-3 mt-4">
            <DetailCard title="Email" value={email} />
            <DetailCard title="Phone" value={phone} />
            <DetailCard title="Age" value={age} />
            <DetailCard title="Gender" value={gender} />
            <DetailCard title="User Since" value={createdOn?.split("T")[0]} />
        </View>
    );
}
