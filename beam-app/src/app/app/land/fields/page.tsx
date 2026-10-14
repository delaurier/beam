import type { Metadata } from "next";
import { LandFields } from "@/components/app/screens/land-fields";

export const metadata: Metadata = { title: "Fields" };

export default function Page() {
  return <LandFields />;
}
