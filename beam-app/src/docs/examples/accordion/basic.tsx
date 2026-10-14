import { Accordion } from "@/components/ui/accordion";

export default function AccordionBasic() {
  return (
    <div className="w-[480px] max-w-full">
      <Accordion
        items={[
          { title: "How is break-even worked out?", content: "Total cost per acre divided by expected yield per acre." },
          { title: "What counts as sold?", content: "Any sale with a contract, filled or open." },
          { title: "Can I change the yield basis?", content: "Yes, between expected yield and actual production history.", disabled: true },
        ]}
      />
    </div>
  );
}
