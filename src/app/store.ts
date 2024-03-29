import { create } from "zustand";

interface BreadcrumbState {
  breadcrumb: string | "home";
  setBreadcrumb: (bread: string) => void;
}
const useStore = create<BreadcrumbState>((set) => ({
  breadcrumb: "Home",
  setBreadcrumb: (bread: string) => set(() => ({ breadcrumb: bread })),
}));

export default useStore;
