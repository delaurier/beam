import { Radio, RadioGroup } from "@/components/ui/radio";

export default function RadioGroupExample() {
  return (
    <RadioGroup defaultValue="c" aria-label="Temperature unit">
      <Radio value="c">Celsius</Radio>
      <Radio value="f">Fahrenheit</Radio>
      <Radio value="k" disabled>
        Kelvin
      </Radio>
    </RadioGroup>
  );
}
