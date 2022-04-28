import React, { createElement } from "react";
import { Helmet } from "react-helmet";
import { formatValue } from "./formatValue";

const assembleProps = (key, value) => {
  const isOpenGraph = key.includes("og:");
  const trimmed = `${key}-${value}`.replace(/\s+/g, '');

  const props = {
    key: trimmed,
    content: value,
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

  const type = isTitle ? "title" : "meta";
  const props = !isTitle && { ...assembleProps(key, value) };
  const children = isTitle && value;

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

  console.log(obj, 'obj')

  return obj;
};

export const appendTags = (meta) => {
  const tags = [];

  const generatedKeys = generateOpenGraphKeys(meta);
  const hasOpenGraphImage = "og:image" in generatedKeys;

  Object.keys(generatedKeys).forEach((key) => {
    const value = generatedKeys[key];

    if (value === "") return;

    const tag = renderTag(key, value);
    tags.push(tag);

    return;
  });

  if (!hasOpenGraphImage) {
    const logo = "insert path to logo here";
    const openGraphImageTag = renderTag("og:image", logo);

    tags.push(openGraphImageTag);
  }

  const openGraphUrlTag = renderTag("og:url", "https://www.test.com");

  tags.push(openGraphUrlTag);

  return <Helmet>{tags}</Helmet>;
};
