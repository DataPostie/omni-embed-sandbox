import { EmbedConnectionRoles, embedSsoDashboard, EmbedSsoDashboardProps } from '@omni-co/embed'

interface UserEmbedSsoDashboardProps {
    contentId: string
}

const createSignedEmbedUrl = async (userEmbedSsoDashboardProps: UserEmbedSsoDashboardProps): Promise<string> => {
    if (!process.env.OMNI_EMBED_SECRET) {
        throw new Error('Omni embed secret not found.')
    }
    if (!process.env.OMNI_HOST) {
        throw new Error('Omni host not specified.')
    }
    const embedSsoDashboardProps: EmbedSsoDashboardProps = {
        contentId: userEmbedSsoDashboardProps.contentId,
        externalId: 'sandbox_user',
        name: 'Sandbox User',
        secret: process.env.OMNI_EMBED_SECRET,
        host: process.env.OMNI_HOST.replace("omniapp", "embed-omniapp")
    }
    const iframeUrl = await embedSsoDashboard(embedSsoDashboardProps);
    return iframeUrl
}

export async function POST(request: Request) {
    try {
        const requestData = await request.json()
        if (!requestData || !requestData.contentId) {
            throw new Error('Please specify a valid content ID.')
        }
        const iframeUrl = await createSignedEmbedUrl({
            contentId: requestData.contentId
        })
        return new Response(JSON.stringify({ iframeUrl: iframeUrl }), { status: 200 })
    } catch (error) {
        return new Response(((error as any).message || error), {
            status: (error as any).status || (error as any).statusCode || 400,
            headers: {
              'Content-Type': 'application/json',
            },
        });
    }
}