"use client";

import { useState } from "react";
import { Toast, type ToastMessage } from "@/components/docs/toast";
import { Button } from "@/components/ui/button";

export default function ToastBasic() {
  const [message, setMessage] = useState<ToastMessage | null>(null);
  return (
    <>
      <Button variant="outline" onClick={() => setMessage((m) => ({ id: (m?.id ?? 0) + 1, title: "Sensor BM-2041 is back online", description: "North block, row 14" }))}>
        Show toast
      </Button>
      <Toast message={message} />
    </>
  );
}
