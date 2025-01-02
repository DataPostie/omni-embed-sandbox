export const apiFetch = async (
    path: string,
    method: "GET" | "POST",
    body?: any,
    headers?: any
) => {
    const fetchParams: any = { method };
    if (body) {
        fetchParams.body = JSON.stringify(body);
    }
    if (headers) {
        fetchParams.headers = { ...headers };
    }
    const response = await fetch(path, fetchParams);
    if (!response || !response.ok) {
        throw new Error(await response.text());
    } else if (
        response.headers.get("Content-Length") &&
        parseInt(response.headers.get("Content-Length")!) === 0
    ) {
        return true;
    } else {
        const responseText = await response.text();
        try {
            return JSON.parse(responseText);
        } catch (jsonError) {
            return responseText;
        }
    }
};
