"use client";

import { useState } from "react";
import { Button } from "primereact/button";
import { Sidebar } from 'primereact/sidebar';

export default function Navbar() {

    const [sidebarVisible, setSidebarVisible] = useState(false);

    return (
        <nav className="border-b border-slate-300">

            <Sidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)}>
                <h2>Menu</h2>
            </Sidebar>

            <div className="mx-auto px-4 py-3 flex items-center justify-between">
                <div></div>
                <div className="flex items-center space-x-4">
                    <Button icon="pi pi-bars" onClick={() => setSidebarVisible(true)} className="text-slate-800 bg-transparent border-none" aria-label="Open menu" />
                </div>
            </div>
        </nav>
    );
}
