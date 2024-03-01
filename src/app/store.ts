import { breadcrumbType, postType } from '@/lib/types';
import { create } from 'zustand';

interface BreadcrumbState {
  breadcrumb: string;
  setBreadcrumb: (bread: string) => void;
}
const useStore = create<BreadcrumbState>((set) => ({
  breadcrumb: 'Home',
  setBreadcrumb: (bread: string) => set(() => ({ breadcrumb: bread })),
}));

export default useStore;
