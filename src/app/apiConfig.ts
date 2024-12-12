export const apiFetch = async (path: string, method: "GET" | "POST", body?: any, headers?: any) => {
    const fetchParams: any = { method }
    if (body) {
        fetchParams.body = JSON.stringify(body)
    }
    const response = await fetch(path, fetchParams)
    if (!response || !response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    } else if (response.headers.get('Content-Length') && parseInt(response.headers.get('Content-Length')!) === 0) {
        return true
    } else {
        const responseJson = await response.json();
        return responseJson;
    }
}