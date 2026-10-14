import type { Metadata } from "next";
import { NotDesigned } from "@/components/app/screens/not-designed";

export const metadata: Metadata = { title: "Operations" };

export default function Page() {
  return <NotDesigned title="Operations" />;
}
