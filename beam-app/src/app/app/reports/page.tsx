import type { Metadata } from "next";
import { Reports } from "@/components/app/screens/reports";

export const metadata: Metadata = { title: "Reports" };

export default function Page() {
  return <Reports />;
}
