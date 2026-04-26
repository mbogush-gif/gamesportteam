export const asset = (p?: string): string | undefined => {
  if (!p) return p;
  if (/^(https?:|data:|blob:)/i.test(p)) return p;
  const base = import.meta.env.BASE_URL || "/";
  return `${base.replace(/\/$/, "")}/${p.replace(/^\//, "")}`;
};
