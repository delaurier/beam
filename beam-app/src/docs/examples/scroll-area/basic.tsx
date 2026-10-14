import { ScrollArea } from "@/components/ui/scroll-area";

export default function ScrollAreaBasic() {
  return (
    <div className="w-80 max-w-full">
      <ScrollArea>
        <ul className="flex flex-col gap-xs">
          {["Sam's Dysart 160", "Mack's East 160", "North 80", "South 80", "South 40", "Home South", "Alissa's North", "Home West", "Miller Quarter", "River Bottom", "Dysart West"].map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
