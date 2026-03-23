import React from "react";
import { ScreenContent } from "../shared/ScreenContent";
import HomeContent from "./components/HomeContent";
import MenuContent from "./components/MenuContent";
import OrchardsContent from "./components/OrchardsContent";
import ProductsContent from "./components/ProductsContent";
import { HeaderVariant } from "./types";

interface AppHeaderProps {
  variant: HeaderVariant;
}

const VARIANT_MAP: Record<HeaderVariant, React.FC> = {
  home: HomeContent,
  menu: MenuContent,
  products: ProductsContent,
  orchards: OrchardsContent,
};

const AppHeader = ({ variant }: AppHeaderProps) => {
  const Content = VARIANT_MAP[variant];
  return (
    <ScreenContent className="bg-light">
      <Content />
    </ScreenContent>
  );
};

export default React.memo(AppHeader);
