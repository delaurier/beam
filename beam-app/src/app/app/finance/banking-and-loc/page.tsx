import type { Metadata } from "next";
import { NotDesigned } from "@/components/app/screens/not-designed";

export const metadata: Metadata = { title: "Banking and LOC" };

export default function Page() {
  return <NotDesigned title="Banking and LOC" />;
}
