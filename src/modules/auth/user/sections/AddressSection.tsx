//@ts-nocheck
import * as Location from "expo-location";
import { useState } from "react";
import { Button, View } from "react-native";
import FormInput from "../../../../components/form/inputs/FormInput";
import SingleSelectInput from "../../../../components/form/inputs/SingleSelectInput";

interface Props {
  control: any;
  errors: any;
}

export default function AddressSection({ control, errors }: Props) {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);

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
    <View style={{ gap: 12 }}>
      {/* State */}
      <SingleSelectInput
        control={control}
        modalLabel="State"
        name="state"
        label="State"
        options={[
          { label: "Jammu & Kashmir", value: "jammu_kashmir" },
          { label: "Ladakh", value: "ladakh" },
        ]}
        error={errors.state}
      />

      {/* District */}
      <SingleSelectInput
        control={control}
        modalLabel="District"
        name="district"
        label="District"
        options={[
          { label: "Leh", value: "leh" },
          { label: "Kargil", value: "kargil" },
          { label: "Anantnag", value: "anantnag" },
          { label: "Bandipora", value: "bandipora" },
          { label: "Baramulla", value: "baramulla" },
          { label: "Budgam", value: "budgam" },
          { label: "Doda", value: "doda" },
          { label: "Ganderbal", value: "ganderbal" },
          { label: "Jammu", value: "jammu" },
          { label: "Kathua", value: "kathua" },
          { label: "Kishtwar", value: "kishtwar" },
          { label: "Kulgam", value: "kulgam" },
          { label: "Kupwara", value: "kupwara" },
          { label: "Poonch", value: "poonch" },
          { label: "Pulwama", value: "pulwama" },
          { label: "Rajouri", value: "rajouri" },
          { label: "Ramban", value: "ramban" },
          { label: "Reasi", value: "reasi" },
          { label: "Samba", value: "samba" },
          { label: "Shopian", value: "shopian" },
          { label: "Srinagar", value: "srinagar" },
          { label: "Udhampur", value: "udhampur" },
        ]}
        error={errors.district}
      />

      {/* Tehsil */}
      {/* <SingleSelectInput
        control={control}
        name="tehsil"
        label="Tehsil"
        options={[
          { label: "Tehsil A", value: "tehsil_a" },
          { label: "Tehsil B", value: "tehsil_b" },
          { label: "Tehsil C", value: "tehsil_c" },
          { label: "Tehsil D", value: "tehsil_d" },
        ]}
        error={errors.tehsil}
      /> */}

      <FormInput
        control={control}
        name="tehsil"
        label="Tehsil"
        error={errors.tehsil?.message}
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

      {/* Street */}
      {/* <FormInput
        control={control}
        name="street"
        label="Street / Locality"
        error={errors.street}
      /> */}
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
      )} */}
    </View>
  );
}
