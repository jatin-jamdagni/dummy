import { PickupRequestForm } from "./forms/pickup-request-form";
import { RetrievalRequestForm } from "./forms/retrieval-request-form";
import { ScanningRequestForm } from "./forms/scanning-request-form";
import { ShredRequestForm } from "./forms/shred-request-form";

interface RequestFormsProps {
  selectedType: string;
}

export function RequestForms({ selectedType }: RequestFormsProps) {
  switch (selectedType) {
    case "PICKUP":
      return <PickupRequestForm />;
    case "SCANNING":
      return <ScanningRequestForm />;
    case "RETRIEVAL":
      return <RetrievalRequestForm />;
    case "SHREDDING":
      return <ShredRequestForm />;
    default:
      return null;
  }
}
