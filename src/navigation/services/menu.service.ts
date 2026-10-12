import axiosInstance from "@/src/api/client/axiosInstance";

const MENU_LIST_URL = "/api/pages";
const PAGE_DETAIL_URL = "/api/pages/PageDetail";

/* ============================== TYPES ============================== */

export type MenuItem = {
  id: number;
  name: string;
  slug: string;
  createdOn: string;
  isPublished: boolean;
};

export type PageDetail = {
  name: string;
  body: string; // HTML string
  metaTitle: string | null;
  metaKeywords: string | null;
  metaDescription: string | null;
};

/* ============================== SERVICES ============================== */

// Returns only the pages the admin has published
export const getMenuList = async (): Promise<MenuItem[]> => {
  const response = await axiosInstance.get(MENU_LIST_URL);
  const pages: MenuItem[] = response.data ?? [];

  return pages.filter((page) => page.isPublished);
};

export const getPageDetail = async (id: number): Promise<PageDetail> => {
  const response = await axiosInstance.get(PAGE_DETAIL_URL, {
    params: { id },
  });

  return response.data;
};
