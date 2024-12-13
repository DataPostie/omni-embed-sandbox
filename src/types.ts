interface EmbedContent {
    id: string,
    title?: string
}

export interface EmbedExample {
    title: string,
    content: EmbedContent[],
    user_attributes: any
}