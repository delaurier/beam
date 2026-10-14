import type { Metadata } from "next";
import { CornMarketing } from "@/components/app/screens/corn-marketing";

export const metadata: Metadata = { title: "Corn marketing" };

export default function Page() {
  return <CornMarketing />;
}
