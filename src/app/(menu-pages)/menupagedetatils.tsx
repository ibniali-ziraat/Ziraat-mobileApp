import DetailsPage from "@/src/navigation/pages/DetailsPage";
import { useLocalSearchParams } from "expo-router";

const MenuPageDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <DetailsPage id={Number(id)} />;
};

export default MenuPageDetails;
