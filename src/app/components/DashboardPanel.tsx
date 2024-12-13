import React, { useEffect, useState } from "react";
import { apiFetch } from "../apiConfig";
import ErrorBoundary from "./ErrorBoundary";
import { EmbedExample } from "@/types";

export default function DashboardPanel({ embedExample }: { embedExample: EmbedExample }) {

    const [iframeUrl, setIframeUrl] = useState<string | null>(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchIframeUrl() {
            try {
                const iframeUrlResponse = await apiFetch("/api/embed", "POST", { contentId: embedExample.content[0].id })
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
                    <iframe className="h-full w-full min-h-[85vh]" src={iframeUrl} />
                ) }
            </ErrorBoundary>
        </div>
    );
}
