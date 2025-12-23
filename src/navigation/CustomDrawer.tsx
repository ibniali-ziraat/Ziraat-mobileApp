// import { colors } from "@/src/constants/colors";
// import { DrawerContentScrollView } from "@react-navigation/drawer";
// import {
//   BarChart2,
//   BookOpen,
//   ChevronDown,
//   ChevronRight,
//   Cloud,
//   CreditCard,
//   Dot,
//   Home,
//   ListChecks,
//   LogOutIcon,
//   Package,
//   Settings,
//   ShoppingCart,
//   User,
//   Users,
// } from "lucide-react-native";
// import { useState } from "react";
// import { Image, Text, TouchableOpacity, View } from "react-native";

// export function CustomDrawer({ navigation, menuGroups }) {
//   const [openGroup, setOpenGroup] = useState<string | null>(null);

//   const toggleGroup = (title: string) => {
//     setOpenGroup((prev) => (prev === title ? null : title));
//   };

//   const DrawerItem = ({
//     label,
//     onPress,
//     isSubItem = false,
//     Icon,
//   }: {
//     label: string;
//     onPress: () => void;
//     isSubItem?: boolean;
//     Icon?: any;
//   }) => (
//     <TouchableOpacity
//       onPress={onPress}
//       className={`flex-row items-center ${isSubItem ? "pl-6 py-2" : "px-5 py-3"}`}
//     >
//       {Icon && <Icon color={colors.dark} size={16} className="mr-3" />}
//       <CsText
//         className={`${
//           isSubItem ? "text-base font-normal" : "text-base font-medium"
//         } text-dark`}
//       >
//         {label}
//      </CsText>
//     </TouchableOpacity>
//   );

//   return (
//     <DrawerContentScrollView className="bg-light">
//       <View className="px-5 pb-6 pt-2 mb-2 border-b border-gray-200">
//         <Image
//           source={require("../../assets/images/logo.jpeg")}
//           style={{ width: "100%", height: 60 }}
//           resizeMode="contain"
//         />
//       </View>

//       <DrawerItem
//         label="Home"
//         onPress={() => navigation.navigate("(tabs)")}
//         Icon={Home}
//       />

//       <DrawerItem
//         label="Marketpssslace"
//         onPress={() => navigation.navigate("marketplace")}
//         Icon={ShoppingCart}
//       />
//       <DrawerItem
//         label="Become a Supplier"
//         onPress={() => navigation.navigate("/auth/vendor")}
//         Icon={ShoppingCart}
//       />

//       {menuGroups?.map((group) => (
//         <View key={group.title}>
//           {/* GROUP HEADER */}
//           <TouchableOpacity
//             onPress={() => toggleGroup(group.title)}
//             className="flex-row justify-between items-center px-5 py-3"
//           >
//             <View className="flex-row items-center">
//               {group.title === "Farmer Dashboard" && (
//                 <User color={colors.secondary} size={20} className="mr-3" />
//               )}
//               {group.title === "Vendor Dashboard" && (
//                 <Package color={colors.secondary} size={20} className="mr-3" />
//               )}
//               <CsText className="text-base font-medium text-dark">
//                 {group.title}
//              </CsText>
//             </View>
//             <CsText className="text-base text-secondary">
//               {openGroup === group.title ? (
//                 <ChevronDown color={colors.secondary} size={16} />
//               ) : (
//                 <ChevronRight color={colors.secondary} size={16} />
//               )}
//            </CsText>
//           </TouchableOpacity>

//           {openGroup === group.title && (
//             <View className="ml-5">
//               {group.routes.map((item) => (
//                 <DrawerItem
//                   key={item.screen}
//                   label={item.label}
//                   onPress={() => navigation.navigate(item.screen)}
//                   isSubItem
//                   Icon={Dot}
//                 />
//               ))}
//             </View>
//           )}
//         </View>
//       ))}

//       <DrawerItem
//         label="Orders"
//         onPress={() => navigation.navigate("orders")}
//         Icon={ListChecks}
//       />
//       <DrawerItem
//         label="Payments"
//         onPress={() => navigation.navigate("payments")}
//         Icon={CreditCard}
//       />
//       <DrawerItem
//         label="Analytics"
//         onPress={() => navigation.navigate("analytics")}
//         Icon={BarChart2}
//       />
//       <DrawerItem
//         label="Agri News"
//         onPress={() => navigation.navigate("agriNews")}
//         Icon={BookOpen}
//       />
//       <DrawerItem
//         label="Weather"
//         onPress={() => navigation.navigate("weather")}
//         Icon={Cloud}
//       />
//       <DrawerItem
//         label="Community"
//         onPress={() => navigation.navigate("community")}
//         Icon={Users}
//       />

//       <DrawerItem
//         label="Settings"
//         onPress={() => navigation.navigate("settings")}
//         Icon={Settings}
//       />

//       <View className=" px-5 pb-12 border-t border-gray-200">
//         <TouchableOpacity
//           onPress={() => console.log("Logout")}
//           className="flex-row items-center py-3"
//         >
//           <LogOutIcon color={colors.error} size={16} className="mr-3" />
//           <CsText className="text-base font-medium text-red-600">Log out</Text>
//         </TouchableOpacity>
//       </View>
//     </DrawerContentScrollView>
//   );
// }
import { View } from "lucide-react-native";

const CustomDrawer = () => {
  return <View>CustomDrawer</View>;
};

export default CustomDrawer;
