import ZiratCard from "./shared/ZiratCard";
import PrecipitationMap from "./PrecipitationMap";

export default function PrecipitationCard() {
    return (
        <ZiratCard
            title="Precipitation"
            subtitle="Live weather map"

            style={{
                paddingHorizontal: 12,
                paddingBottom: 12,
            }}
        >
            <PrecipitationMap />
        </ZiratCard>
    );
}
