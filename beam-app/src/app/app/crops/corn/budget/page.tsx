import type { Metadata } from "next";
import { CornBudget } from "@/components/app/screens/corn-budget";

export const metadata: Metadata = { title: "Corn budget" };

export default function Page() {
  return <CornBudget />;
}
