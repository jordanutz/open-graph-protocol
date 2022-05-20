import { createTagFallbacks } from "./createTagFalbacks";
import { generateKeys } from "./generateKeys";
import { renderTag } from "./renderTag";
import Placeholder from "../assets/default.png";
import { MetaKeys } from "../types/helpers";

export const renderMeta = (meta: any) => {
  const tags = [];
  const generatedKeys = generateKeys(meta);

  Object.keys(generatedKeys).forEach((key: MetaKeys) => {
    const value = generatedKeys[key];

    if (value !== "") {
      tags.push(renderTag(key, value));
    }
  });

  const openGraphImageContent = Placeholder.src;
  const openGraphTypeContent = "website";

  createTagFallbacks("image", openGraphImageContent, generatedKeys, tags);
  createTagFallbacks("type", openGraphTypeContent, generatedKeys, tags);

  return tags;
};
