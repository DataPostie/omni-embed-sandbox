import embedConfig from "@/embedConfig.json";
import { EmbedConfig, EmbedUser } from "@/types";

const getUserFromToken = (token: string): EmbedUser => {
    const findUser = (embedConfig as EmbedConfig).users.filter(
        (user) => user.accessToken === token
    );
    if (findUser.length <= 0) {
        throw new Error("Invalid access token.");
    }
    return findUser[0];
};

export async function POST(request: Request) {
    try {
        const requestData = await request.json()
        if (!requestData || !requestData.token) {
            throw new Error('Please include a valid access token.')
        }
        return new Response(JSON.stringify(getUserFromToken(requestData.token)), { status: 200 })
    } catch (error) {
        return new Response(((error as any).message || error), {
            status: (error as any).status || (error as any).statusCode || 400,
            headers: {
              'Content-Type': 'application/json',
            },
        });
    }
}