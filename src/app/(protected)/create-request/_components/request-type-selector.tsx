import { Button } from "@/components/ui/button";

const requestTypes = [
  { value: "CPICKUP", label: "Pickup" },
  { value: "CSCANNING", label: "Scanning" },
  { value: "CRETRIEVAL", label: "Retrieval" },
  { value: "CSHREDDING", label: "Shredding" },
];

interface RequestTypeSelectorProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export function RequestTypeSelector({
  selectedType,
  onTypeChange,
}: RequestTypeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {requestTypes.map((type) => (
        <Button
          key={type.value}
          variant={selectedType === type.value ? "default" : "outline"}
          onClick={() => onTypeChange(type.value)}
        >
          {type.label}
        </Button>
      ))}
    </div>
  );
}
