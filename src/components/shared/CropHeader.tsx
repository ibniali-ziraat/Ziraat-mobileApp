import React from "react";
import BackHeader from "./BackHeader";
import { ScreenContent } from "./ScreenContent";

interface CropsHeaderProps {
  role?: "farmer" | "supplier"; // optional role prop
}

const CropsHeader = ({ role = "farmer" }: CropsHeaderProps) => {
  return (
    <ScreenContent
   
    className="bg-light">
     

     
      <BackHeader
                   title="  My Orchards"
                   desc=" Manage and Monitor all Your Orchards & Fields"
                 />
    </ScreenContent>
  );
};

export default React.memo(CropsHeader);
