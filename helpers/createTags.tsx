import { createElement } from "react";
import { formatValue } from "./formatValue";
import Placeholder from "../assets/default.png";

const trimKey = (key, value) => `${key}-${value}`.replace(/\s+/g, "");

const formatMetaKeys = (meta) => {
  const obj = {};

  Object.keys(meta).forEach((key) => {
    const formatted = key.replace(/\s+/g, "");
    obj[formatted] = meta[key];
  });

  return obj;
};

const assembleProps = (key, value) => {
  const isOpenGraph = key.includes("og:");
  const trimmed = trimKey(key, value);

  const props = {
    key: trimmed,
    content: value,
    children: null,
  };

  if (isOpenGraph) {
    props["property"] = key;
    return props;
  }

  props["name"] = key;
  return props;
};

const renderTag = (key, value) => {
  const isTitle = key === "title";
  const titleProps = {
    key: trimKey(key, value),
  };

  const type = isTitle ? "title" : "meta";
  const props = !isTitle ? { ...assembleProps(key, value) } : { ...titleProps };
  const children = isTitle ? value : null;

  return createElement(type, props, children);
};

const generateOpenGraphKeys = (meta) => {
  const obj = { ...meta };

  Object.keys(meta).forEach((key) => {
    const isOpenGraph = key.includes("og:");
    const requiredTags = ["title", "description", "image", "url", "type"];

    if (isOpenGraph || !requiredTags.includes(key)) return;

    const openGraphKey = `og:${key}`;
    obj[openGraphKey] = meta[key];
  });

  return obj;
};

const generateTagFallbacks = (key, content, generatedKeys, tags) => {
  const openGraphKey = formatValue(key, true);
  const hasOpenGraph = openGraphKey in generatedKeys;

  if (!hasOpenGraph) {
    const openGraphTag = renderTag(openGraphKey, content);
    tags.push(openGraphTag);
  }

  return;
};

export const createTags = (meta) => {
  const tags = [];
  const formattedMeta = { ...formatMetaKeys(meta) };

  // Create new object that contains only meta information. Generate new open graph tags from those meta values. 

  const filtered = Object.entries(formattedMeta).filter(([key]) => {
    return !key.includes("og:");
  });

  const metaTags = Object.fromEntries(filtered);
  const generatedKeys = generateOpenGraphKeys(metaTags);

  // Check if any open graph tags from the original meta object exist as a generated key.
  // If that key exists, overwrite its value with what was set in the original meta object. 

  Object.keys(formattedMeta).forEach((key) => {
    const isOpenGraph = key.includes("og:");

    if (isOpenGraph) {
      const isKeyIncluded = key in generatedKeys;

      if (isKeyIncluded) {
        const keyToOverwrite = key.split("og:")[1];

        generatedKeys[key] = formattedMeta[key];
        generatedKeys[keyToOverwrite] = formattedMeta[key];
      }
    }

    return;
  });

  // Append any remaining custom open graph keys passed from original meta object to generated keys if it does not exist. 

  Object.keys(formattedMeta).forEach((key) => {
    const isOpenGraph = key.includes("og:");
    const isKeyIncluded = key in generatedKeys;

    if (isOpenGraph && !isKeyIncluded) {
      generatedKeys[key] = formattedMeta[key];
    }

    return;
  });

  // Create tags from generated keys.

  Object.keys(generatedKeys).forEach((key) => {
    const value = generatedKeys[key];

    if (value === "") return;

    const tag = renderTag(key, value);
    tags.push(tag);
  });

  // Create tags for Image and Type if a custom key is not passed from the page 

  const openGraphImageContent = Placeholder.src;
  const openGraphTypeContent = "website";

  generateTagFallbacks("image", openGraphImageContent, generatedKeys, tags);
  generateTagFallbacks("type", openGraphTypeContent, generatedKeys, tags);

  return tags;
};
