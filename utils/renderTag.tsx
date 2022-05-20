import { createElement, ReactNode } from "react";
import { MetaKeys } from "../types/helpers";
import { assembleProps } from "./assembleProps";
import { removeKeySpaces } from "./removeKeySpaces";

export const renderTag = (key: MetaKeys, value: string): ReactNode => {
  const isTitle = key === "title";
  const titleProps = {
    key: removeKeySpaces(key, value),
  };

  const type = isTitle ? "title" : "meta";
  const props = !isTitle ? { ...assembleProps(key, value) } : { ...titleProps };
  const children = isTitle ? value : null;

  return createElement(type, props, children);
};
