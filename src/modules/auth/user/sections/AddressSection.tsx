//@ts-nocheck
import * as Location from "expo-location";
import { useState } from "react";
import { Button, View } from "react-native";
import FormInput from "../../../../components/form/inputs/FormInput";
import SingleSelectInput from "../../../../components/form/inputs/SingleSelectInput";
import { useCascadingLocation } from "@/src/hooks/useCascadingLocation";

interface Props {
  control: any;
  errors: any;
}

export default function AddressSection({ control, errors }: Props) {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);

  const { states, districts, tehsils, setSelectedState, setSelectedDistrict } =
    useCascadingLocation();

  async function fetchLocation() {
    try {
      setLoading(true);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission denied");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setCoords({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    } catch (err) {
      console.log("GPS error", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ gap: 6 }}>
      {/* State */}
      <SingleSelectInput
        control={control}
        modalLabel="State"
        name="state"
        label="State"
        options={states.map((s) => ({ label: s, value: s }))}
        onValueChange={(value) => {
          setSelectedState(value as string);
          setSelectedDistrict(null);
        }}
        error={errors.state}
      />

      {/* District */}
      <SingleSelectInput
        control={control}
        modalLabel="District"
        name="district"
        label="District"
        searchable
        options={districts.map((d) => ({ label: d, value: d }))}
        onValueChange={(value) => setSelectedDistrict(value as string)}
        disabled={!districts.length}
        error={errors.district}
      />

      {/* Tehsil */}
      <SingleSelectInput
        control={control}
        modalLabel="Tehsil"
        name="tehsil"
        label="Tehsil"
        searchable
        options={tehsils.map((t) => ({ label: t, value: t }))}
        disabled={!tehsils.length}
        error={errors.tehsil}
      />

      <FormInput
        control={control}
        name="village"
        label="Village"
        error={errors.village?.message}
      />

      {/* Pincode */}
      <FormInput
        control={control}
        name="pincode"
        label="Pin Code"
        keyboardType="numeric"
        error={errors.pincode?.message}
      />

      {/* GPS (UNCHANGED, still available) */}
      {/* 
      <Button
        title={loading ? "Fetching Location..." : "Use Current Location"}
        onPress={fetchLocation}
      />

      {coords && (
        <View style={{ marginTop: 10 }}>
          <FormInput
            control={control}
            name="gps"
            label="GPS Location"
            value={`${coords.latitude}, ${coords.longitude}`}
            editable={false}
          />
        </View>
      )} 
      */}
    </View>
  );
}
