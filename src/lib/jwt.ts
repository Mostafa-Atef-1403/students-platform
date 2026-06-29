export function decodeJwt(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function extractUserIdFromToken(token: string): string | null {
  const payload = decodeJwt(token);
  if (!payload) return null;
  const candidates = [
    "nameid",
    "sub",
    "userId",
    "uid",
    "id",
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
  ];
  for (const key of candidates) {
    const v = payload[key];
    if (v != null) return String(v);
  }
  return null;
}
