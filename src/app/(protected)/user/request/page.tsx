"use client";

import { useState } from "react";
import { RequestTypeSelector } from "../_components/request-type-selector";
import { RequestForms } from "../_components/request-forms";

export default function RequestsPage() {
  const [selectedRequestType, setSelectedRequestType] = useState("CPICKUP");

  return (
    <div className="container mx-auto  space-y-10">
      <div className="bg-card text-card-foreground rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Create New Request</h2>
        <RequestTypeSelector
          selectedType={selectedRequestType}
          onTypeChange={setSelectedRequestType}
        />
        <RequestForms selectedType={selectedRequestType} />
      </div>
    </div>
  );
}
