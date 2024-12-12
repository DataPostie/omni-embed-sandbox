"use client";

import React, { useEffect, useState } from "react";
import { apiFetch } from "../apiConfig";
import embedConfig from "@/embedConfig.json"
import ErrorBoundary from "./ErrorBoundary";

export default function DashboardPanel() {

    const [iframeUrl, setIframeUrl] = useState<string | null>(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchIframeUrl() {
            try {
                const iframeUrlResponse = await apiFetch("/api/embed", "POST", { contentId: embedConfig.contentId })
                setIframeUrl(iframeUrlResponse.iframeUrl)
            } catch (err: any) {
                setError(err)
            }
        }
        fetchIframeUrl()
    }, [])

    return (
        <div>
            <ErrorBoundary loading={false} error={error}>
                { iframeUrl && (
                    <iframe className="h-full w-full min-h-[80vh]" src={iframeUrl} />
                ) }
            </ErrorBoundary>
        </div>
    );
}
