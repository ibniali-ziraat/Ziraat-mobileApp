import { useQuery } from "@tanstack/react-query";
import { getMenuList, getPageDetail } from "../services/menu.service";

export const pageKeys = {
  menu: ["pages", "menu"] as const,
  detail: (id: number) => ["pages", "detail", id] as const,
};

export const useMenuList = () => {
  return useQuery({
    queryKey: pageKeys.menu,
    queryFn: getMenuList,
    staleTime: 1000 * 60 * 5, // admin can add pages anytime, so refresh every 5 minutes
  });
};

export const usePageDetail = (id?: number) => {
  return useQuery({
    queryKey: pageKeys.detail(id ?? 0),
    queryFn: () => getPageDetail(id as number),
    enabled: id !== undefined && id !== null, // id 0 is still allowed
    staleTime: 1000 * 60 * 30, // page content, cache for 30 minutes
  });
};
