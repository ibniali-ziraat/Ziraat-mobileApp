// import { View, Platform } from "react-native";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import { Text } from "react-native-paper";

// export default function PrecipitationMap() {
//   const region = {
//     latitude: 34.083656,
//     longitude: 74.797371,
//     latitudeDelta: 0.45,
//     longitudeDelta: 0.45,
//   };

//   if (Platform.OS === "web") {
//     return (
//       <View
//         style={{
//           height: 220,
//           width: "100%",
//           borderRadius: 12,
//           backgroundColor: "#FFFFFF",
//           alignItems: "center",
//           justifyContent: "center",
//           borderWidth: 1,
//           borderColor: "#E5E7EB",
//         }}
//       >
//         <Text style={{ fontSize: 12, color: "#6B7280" }}>
//           Map not supported on web
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View
//       style={{
//         height: 220,
//         width: "100%",
//         borderRadius: 12,
//         overflow: "hidden",
//         backgroundColor: "#FFFFFF",
//       }}
//     >
//       <MapView
//         style={{ flex: 1 }}
//         initialRegion={region}
//         provider={
//           Platform.OS === "android"
//             ? PROVIDER_GOOGLE
//             : undefined
//         }
//         mapType="standard"
//         showsBuildings={false}
//         showsIndoors={false}
//         toolbarEnabled={false}
//         scrollEnabled
//         zoomEnabled
//       />
//     </View>
//   );
// }
