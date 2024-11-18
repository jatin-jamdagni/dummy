import { PickupRequestForm } from "./_forms/pickup-request-form";
import { RetrievalRequestForm } from "./_forms/retrieval-request-form";
import { ScanningRequestForm } from "./_forms/scanning-request-form";
import { ShredRequestForm } from "./_forms/shred-request-form";

interface RequestFormsProps {
  selectedType: string;
}

export function RequestForms({ selectedType }: RequestFormsProps) {
  switch (selectedType) {
    case "CPICKUP":
      return <PickupRequestForm />;
    case "CSCANNING":
      return <ScanningRequestForm />;
    case "CRETRIEVAL":
      return <RetrievalRequestForm />;
    case "CSHREDDING":
      return <ShredRequestForm />;
    default:
      return null;
  }
}
