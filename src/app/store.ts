import { create } from 'zustand';
interface BreadcrumbState {
  breadcrumb: string;
  setBreadcrumb: (bread: string) => void;
}
const useStore = create<BreadcrumbState>((set) => ({
  breadcrumb: 'home',
  setBreadcrumb: (bread: string) => set((state) => ({ breadcrumb: bread })),
}));

export default useStore;
