export function getBaseUrl() {
    // SSR: no existe window
    if (typeof window === "undefined") {
        return import.meta.env.INTERNAL_API_URL || "http://backend:4000";
    }

    // Cliente: navegador
    // return import.meta.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    return import.meta.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
}