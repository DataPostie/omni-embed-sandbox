import React from "react";
import { Dropdown } from "primereact/dropdown";
import embedConfig from "@/embedConfig.json"
import { EmbedConfig, EmbedUser } from "@/types";

export default function ExampleSelector({ selectedUser, setSelectedUser}: { selectedUser: EmbedUser | null, setSelectedUser: React.Dispatch<React.SetStateAction<EmbedUser | null>>}) {

    const options = (embedConfig as EmbedConfig).users.map(user => ({
        optionName: `${embedConfig.content.title} - User ${user.id}`,
        value: {
            accessToken: user.accessToken
        }
    }))

    return (
        <div className="w-full text-center pt-20">
            <Dropdown value={selectedUser} onChange={(e) => setSelectedUser(e.value)} options={options} optionLabel="optionName" placeholder="Select an Example" />
        </div>
    );
}
