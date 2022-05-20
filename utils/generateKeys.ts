import { MetaKeys } from "../types/helpers";

export function generateKeys(meta: MetaKeys[]) {
  const generatedKeys = {};
  const requiredTags = ["title", "description", "image", "url", "type"];

  Object.keys(meta).forEach((key) => {
    const formatted = key.replace(/\s+/g, "");
    generatedKeys[formatted] = meta[key];

    const isOpenGraph = formatted.includes("og:");
    if (isOpenGraph || !requiredTags.includes(formatted)) return;

    const openGraphKey = `og:${formatted}`;
    generatedKeys[openGraphKey] = meta[key];
  });

  return generatedKeys;
}
