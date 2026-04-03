export function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

export function requireFields(obj, fields = []) {
  for (const f of fields) {
    if (!obj?.[f]) return `${f} is required`;
  }
  return null;
}