import { Message } from "primereact/message";
import { ProgressBar } from "primereact/progressbar";

interface AxiosError extends Error {
    response?: {
        data?: string;
    };
    responseText?: string;
}

const parseMessageFromError = (error: AxiosError): string | null => {
    if (!error) {
        return null;
    }
    return (
        error.message ||
        (error.response ? error.response.data : null) ||
        error.responseText ||
        null
    );
};

export default function ErrorBoundary(props: any) {
    if (props.loading) {
        return (
            <div>
                <ProgressBar mode="indeterminate" className="h-1" />
            </div>
        );
    }

    if (props.error) {
        return (
            <div className="text-center">
                <Message
                    severity="error"
                    text={parseMessageFromError(props.error)}
                    className="my-5"
                />
            </div>
        );
    }

    return props.children;
}
