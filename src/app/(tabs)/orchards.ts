import OrchardsScreen from "@/src/modules/orchard/OrchardScreen";
import React from "react";
import NotFoundPage from "../[...404]";
export default function Crops() {
  //  { return React.createElement(OrchardsScreen, null); }
  return React.createElement(NotFoundPage, null);
}
