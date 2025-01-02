import { apiFetch } from "@/app/apiConfig";
import { tableFromIPC } from "apache-arrow";
import { EmbedDashboard, EmbedUser } from "@/types";

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

const parseQueryApiResponse = (truncatedJsonResponse: string) => {
    const responseArray = truncatedJsonResponse.split("\n")
    if (responseArray.length < 2) { return JSON.parse(responseArray[0]) }
    return JSON.parse(responseArray[1])
}

const parseBase64ApacheArrowResult = (base64String: string) => Uint8Array.from(Buffer.from(base64String, "base64"));

const makePreloadApiQueryCall = async (dashboard: EmbedDashboard, user: EmbedUser): Promise<number | null> => {
    if (!dashboard.preload_api_query_call) { return null }
    const apiQueryBody = dashboard.preload_api_query_call;
    if (dashboard.preload_api_query_call.user_attribute_filter_field) {
        apiQueryBody.filters[dashboard.preload_api_query_call.user_attribute_filter_field] = {
            "is_inclusive": false,
            "is_negative": false,
            "kind": "EQUALS",
            "type": "number",
            "values": user.user_attributes[dashboard.preload_api_query_call.user_attribute_key]
        }
    }
    const apiResponse = await createApiQueryCallPayload(apiQueryBody);
    const parsedApiResponse = parseQueryApiResponse(apiResponse);
    const apiResultTable = tableFromIPC(parseBase64ApacheArrowResult(parsedApiResponse.result))
    return apiResultTable.batches[0].data.children[0].values[0]
}

export async function POST(request: Request) {
    try {
        const requestData = await request.json()
        if (!requestData || !requestData.dashboard || !requestData.user) {
            throw new Error ("Invalid API call.")
        }
        const result = await makePreloadApiQueryCall(requestData.dashboard, requestData.user)
        return new Response((result as any), {
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
