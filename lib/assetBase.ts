/** Prefix for `/public` files when `NEXT_PUBLIC_BASE_PATH` is set (GitHub Pages). */
export const publicAsset = (path: string) => {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};
