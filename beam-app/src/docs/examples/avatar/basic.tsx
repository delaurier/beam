import { Avatar } from "@/components/ui/avatar";

export default function AvatarBasic() {
  return (
    <div className="flex gap-xs">
      <Avatar name="Paul Delaurier" />
      <Avatar name="Mack Kowalczyk" />
      <Avatar name="Alissa Reyes" />
    </div>
  );
}
