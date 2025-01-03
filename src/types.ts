export interface EmbedDashboard {
    id: string,
    title?: string,
    preload_api_query_call?: any
}

export interface EmbedContent {
    "title": string,
    dashboards: EmbedDashboard[]
}

export interface EmbedUser {
    id: number,
    accessToken: string,
    user_attributes: any
}

export interface EmbedConfig {
    content: EmbedContent,
    users: EmbedUser[]
}