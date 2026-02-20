import type { InternalAxiosRequestConfig } from "axios";

async function hmacSha256Base64(secret: string, message: string): Promise<string> {
    const enc = new TextEncoder();

    const key = await crypto.subtle.importKey(
        "raw",
        enc.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );

    const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
    return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

export function createHmacInterceptor(getSecret: () => string | null) {
    return async (
        config: InternalAxiosRequestConfig
    ): Promise<InternalAxiosRequestConfig> => {

        const secret = getSecret();
        if (!secret) return config;

        const method = (config.method ?? "GET").toUpperCase();
        const url = new URL(config.url ?? "", window.location.origin);
        const pathAndQuery = url.pathname + url.search;

        let payload = "";

        if (config.data) {
            payload =
                typeof config.data === "string"
                    ? config.data
                    : JSON.stringify(config.data);
        }

        const stringToSign =
            method === "GET"
                ? method + pathAndQuery + secret
                : payload + secret;

        const signature = await hmacSha256Base64(secret, stringToSign);

        config.headers.set("X-Signature", signature);

        return config;
    };
}