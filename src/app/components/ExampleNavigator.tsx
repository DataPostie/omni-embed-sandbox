"use client";

import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { TabView, TabPanel } from 'primereact/tabview';
import { apiFetch } from "../apiConfig";
import DashboardPanel from "./DashboardPanel";
import ErrorBoundary from "./ErrorBoundary";
import ExampleSelector from "./ExampleSelector";
import embedConfig from "@/embedConfig.json"
import { EmbedDashboard, EmbedUser } from "@/types";

export default function ExampleNavigator() {
    const [selectedUser, setSelectedUser] = useState<EmbedUser | null>(null);
    const [userDetails, serUserDetails] = useState<EmbedUser | null>(null);
    const [dashboardsToShow, setDashboardsToShow] = useState<EmbedDashboard[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        async function loginUser() {
            try {
                if (!selectedUser) { return null; }
                setLoading(true);
                const newUserDetails = await apiFetch("/api/auth", "POST", { token: selectedUser.accessToken })
                serUserDetails(newUserDetails)
                setLoading(false);
            } catch (err: any) {
                setLoading(false);
                setError(err);
            }
        }
        loginUser()
    }, [selectedUser])

    useEffect(() => {
        async function checkIfDataAvailable() {
            try {
                if (!userDetails) { return null; }
                setLoading(true);
                const preloadApiQueryCallResponses = await Promise.all(embedConfig.content.dashboards.map(dashboard => {
                    if (!dashboard.preload_api_query_call) { return new Promise(resolve => resolve(1)); }
                    return apiFetch("/api/query", "POST", { dashboard: dashboard, user: userDetails })
                }))
                setDashboardsToShow(embedConfig.content.dashboards.filter((dashboard, index) => preloadApiQueryCallResponses[index]));
                setLoading(false);
            } catch (err: any) {
                setLoading(false);
                setError(err);
            }
        }
        checkIfDataAvailable()
    }, [userDetails])

    return (
        <div>
            {!selectedUser && (
                <ExampleSelector
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                />
            )}
            <ErrorBoundary loading={loading} error={error}>
                {userDetails && dashboardsToShow && (
                    <div>
                        <TabView pt ={{ 
                            nav: { className: "bg-transparent" }
                        }}>
                            { dashboardsToShow.map(dashboard => (
                                <TabPanel key={dashboard.id} header={dashboard.title}>
                                    <DashboardPanel embedDashboard={dashboard} userAttributes={userDetails.user_attributes} />
                                </TabPanel>
                            )) }
                        </TabView>
                        <Button className="mt-3 py-1 px-3" onClick={() => setSelectedUser(null)}><span><i className="pi pi-arrow-left pr-2"></i>Back</span></Button>
                    </div>
                )}
            </ErrorBoundary>
        </div>
    );
}
