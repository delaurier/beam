import type { Metadata } from "next";
import { CornViews } from "@/components/app/screens/corn-views";
import { NotDesigned } from "@/components/app/screens/not-designed";
import { PageHeader } from "@/components/patterns/app-shell";

export const metadata: Metadata = { title: "Corn inputs" };

export default function Page() {
  return (
    <>
      <PageHeader title="Corn" />
      <CornViews current="Inputs" />
      <NotDesigned title="The Inputs view" embedded />
    </>
  );
}
