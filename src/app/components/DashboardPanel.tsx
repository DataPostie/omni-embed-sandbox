import React, { useEffect, useState } from "react";
import { apiFetch } from "../apiConfig";
import ErrorBoundary from "./ErrorBoundary";
import { EmbedDashboard } from "@/types";

export default function DashboardPanel({ embedDashboard, userAttributes }: { embedDashboard: EmbedDashboard, userAttributes?: any }) {

    const [iframeUrl, setIframeUrl] = useState<string | null>(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchIframeUrl() {
            try {
                const iframeUrlResponse = await apiFetch("/api/embed", "POST", { contentId: embedDashboard.id, userAttributes: userAttributes })
                setIframeUrl(iframeUrlResponse.iframeUrl)
            } catch (err: any) {
                setError(err)
            }
        }
        fetchIframeUrl()
    }, [embedDashboard, userAttributes])

    return (
        <div>
            <ErrorBoundary loading={false} error={error}>
                { iframeUrl && (
                    <iframe className="h-full w-full min-h-[85vh]" src={iframeUrl} />
                ) }
            </ErrorBoundary>
        </div>
    );
}
