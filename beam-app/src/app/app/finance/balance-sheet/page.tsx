import type { Metadata } from "next";
import { BalanceSheet } from "@/components/app/screens/balance-sheet";

export const metadata: Metadata = { title: "Balance sheet" };

export default function Page() {
  return <BalanceSheet />;
}
