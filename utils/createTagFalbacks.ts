import { ReactNode } from "react";
import { MetaKeys } from "../types/helpers";
import { renderTag } from "./renderTag";

export function createTagFallbacks(
  key: string,
  content: string,
  generatedKeys,
  tags: ReactNode[]
): void {
  const openGraphKey = `og:${key}` as MetaKeys;
  const hasOpenGraph = openGraphKey in generatedKeys;

  if (!hasOpenGraph) {
    const openGraphTag = renderTag(openGraphKey, content);
    tags.push(openGraphTag);
  }

  return;
}
