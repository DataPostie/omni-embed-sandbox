"use client";

import React, { useState } from "react";
import { Button } from "primereact/button";
import DashboardPanel from "./DashboardPanel";
import ExampleSelector from "./ExampleSelector";
import { EmbedExample } from "@/types";

export default function ExampleNavigator() {
    const [selectedExample, setSelectedExample] = useState<EmbedExample | null>(
        null
    );

    return (
        <div>
            {!selectedExample && (
                <ExampleSelector
                    selectedExample={selectedExample}
                    setSelectedExample={setSelectedExample}
                />
            )}
            {selectedExample && (
                <div>
                    <DashboardPanel embedExample={selectedExample} />
                    <Button className="mt-3 py-1 px-3" onClick={() => setSelectedExample(null)}><span><i className="pi pi-arrow-left pr-2"></i>Back</span></Button>
                </div>
            )}
        </div>
    );
}
