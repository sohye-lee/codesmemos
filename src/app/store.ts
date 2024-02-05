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

// interface StoreState {
//   breadcrumb: string
//   // storeState: {
//   //   breadcrumb: string;
//   //   type: string;
//   // }
//   // breadcrumb: string;
//   // setStoreState: (state:{breadcrumb:string, type:string}) => void;
// }

// const useStore = create<StoreState>((set) => ({
//   storeState: {
//     breadcrumb: 'Home',
//     type: 'all',
//   },
//   setStoreState: (storeState ) => set((state) => ({ storeState: { breadcrumb: storeState.breadcrumb, type: storeState.type }})
//   ),
// }));

export default useStore;
