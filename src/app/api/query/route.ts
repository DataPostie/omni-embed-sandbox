import { apiFetch } from "@/app/apiConfig";
import { tableFromIPC } from "apache-arrow";
import embedConfig from "@/embedConfig.json";

interface OmniQueryApiQuery {
    modelId: string;
    table: string;
    fields: string[];
    filters?: any
}

const createApiQueryCallPayload = async (
    apiQueryPayload: OmniQueryApiQuery
): Promise<any> => {
    if (!process.env.OMNI_HOST) {
        throw new Error("Omni host not specified.");
    }
    if (!process.env.OMNI_API_KEY) {
        throw new Error("Omni API key not found.");
    }
    const apiApacheArrowResult = await apiFetch(
        `https://${process.env.OMNI_HOST}/api/unstable/query/run`,
        "POST",
        { query: apiQueryPayload },
        { "Authorization": `Bearer ${process.env.OMNI_API_KEY}` }
    );
    return apiApacheArrowResult;
};

const parseBase64ApacheArrowResult = (base64String: string) => Uint8Array.from(Buffer.from(base64String, "base64"));

export async function POST(request: Request) {
    try {

        const apiResponse = await createApiQueryCallPayload({
            ...embedConfig.api_query_call_example,
        });
        const apiResultTable = tableFromIPC(parseBase64ApacheArrowResult(apiResponse))
        const result = apiResultTable.batches[0].data.children[0].values[0]
        return new Response(result, {
            status: 200,
        });
    } catch (error) {
        return new Response((error as any).message || error, {
            status: (error as any).status || (error as any).statusCode || 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
