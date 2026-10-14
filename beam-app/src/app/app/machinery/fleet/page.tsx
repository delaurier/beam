import type { Metadata } from "next";
import { MachineryFleet } from "@/components/app/screens/machinery-fleet";

export const metadata: Metadata = { title: "Fleet" };

export default function Page() {
  return <MachineryFleet />;
}
