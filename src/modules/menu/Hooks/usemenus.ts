import { useQuery } from "@tanstack/react-query";
import { GetMenuLinks } from "../Services/menus.services";

/* ================= QUERY KEYS ================= */
export const menuKeys = {
  links: ["menuLinks"],
};

/* ================= MENU LINKS ================= */
export const useGetMenuLinks = () => {
  return useQuery({
    queryKey: menuKeys.links,
    queryFn: GetMenuLinks,
    staleTime: 1000 * 60 * 30, // cache for 30 min
  });
};
