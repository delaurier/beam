import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";

export default function DialogConfirm() {
  return (
    <Dialog
      trigger={<Button variant="outline">Archive field</Button>}
      title="Archive North block?"
      description="Its 14 sensors stop reporting. Readings already collected stay available."
      confirmLabel="Archive"
    />
  );
}
