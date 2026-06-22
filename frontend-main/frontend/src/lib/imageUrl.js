const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:3000/api";

function getApiOrigin() {
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return "http://localhost:3000";
  }
}

export function resolveImageUrl(url) {
  if (!url) return "/vite.svg";
  if (/^https?:\/\//i.test(url)) return url;
  const origin = getApiOrigin();
  if (url.startsWith("/")) return `${origin}${url}`;
  return `${origin}/${url}`;
}
