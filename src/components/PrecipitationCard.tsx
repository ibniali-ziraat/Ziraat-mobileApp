
import ZiraatCard from "./shared/ZiraatProfileCard";

import PrecipitationMap from "./PrecipitationMap";

export default function PrecipitationCard() {
    return (
        <ZiraatCard
            width={120}
            height={100}

            style={{
                paddingHorizontal: 12,
                paddingBottom: 12,
            }}
        >
            <PrecipitationMap />
        </ZiraatCard>
    );
}
