import { createElement } from "react";
import { formatValue } from "./formatValue";

const trimKey = (key, value) => `${key}-${value}`.replace(/\s+/g, '');

const assembleProps = (key, value) => {
  const isOpenGraph = key.includes("og:");
  const trimmed = trimKey(key, value);

  const props = {
    key: trimmed,
    content: value,
    children: null
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
    key: trimKey(key, value)
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
    const openGraphKey = !isOpenGraph ? formatValue(key, true) : key

    if (isOpenGraph) {
      const keyToOverwrite = key.split("og:")[1];
      const isKeyIncluded = keyToOverwrite in obj;

      if (isKeyIncluded) {
        obj[keyToOverwrite] = meta[openGraphKey];
        obj[openGraphKey] = meta[openGraphKey];
      }

      return;
    }

    obj[openGraphKey] = meta[key];
  });

  return obj;
};

export const createTags = (meta) => {
  const tags = [];

  const generatedKeys = generateOpenGraphKeys(meta);
  const hasOpenGraphImage = "og:image" in generatedKeys;

  Object.keys(generatedKeys).forEach((key) => {
    const value = generatedKeys[key];
    const isUrl = key === "url";

    if (value === "" || isUrl) return;

    const tag = renderTag(key, value);
    tags.push(tag);

    return;
  });

  if (!hasOpenGraphImage) {
    const logo = "insert path to logo here";
    const openGraphImageTag = renderTag("og:image", logo);

    tags.push(openGraphImageTag);
  }

  const openGraphTypeTag = renderTag('og:type', 'website');

  tags.push(openGraphTypeTag);

  console.log(tags, 'tags')

  return tags;
};
