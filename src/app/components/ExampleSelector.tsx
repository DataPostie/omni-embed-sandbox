import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import embedConfig from "@/embedConfig.json"
import { EmbedExample } from "@/types";

export default function ExampleSelector({ selectedExample, setSelectedExample}: { selectedExample: EmbedExample | null, setSelectedExample: React.Dispatch<React.SetStateAction<EmbedExample | null>>}) {
    return (
        <div className="w-full text-center pt-20">
            <Dropdown value={selectedExample} onChange={(e) => setSelectedExample(e.value)} options={[...embedConfig.examples]} optionLabel="title" placeholder="Select an Example" />
        </div>
    );
}
