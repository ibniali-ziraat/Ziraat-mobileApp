import DetailsPage from "@/src/navigation/pages/DetailsPage";
import { useLocalSearchParams } from "expo-router";

const MenuPageDetails = () => {
  const { id, title } = useLocalSearchParams<{ id: string; title?: string }>();

  return <DetailsPage id={Number(id)} title={title} />;
};

export default MenuPageDetails;
