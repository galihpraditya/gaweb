"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/overview");
  }, [router]);

  return (
    <div className="flex items-center justify-center py-20 text-slate-400 text-xs">
      Mengarahkan ke Ringkasan...
    </div>
  );
}
