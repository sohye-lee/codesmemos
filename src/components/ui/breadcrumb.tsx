'use client';

import { usePathname } from "next/navigation";

export default function Breadcrumb() {
    const path = usePathname();
    const pathnames = path.split('/').filter(path => path);
}