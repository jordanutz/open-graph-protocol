import { MetaKeys } from "../types/helpers";
import { removeKeySpaces } from "./removeKeySpaces";

export const assembleProps = (key: MetaKeys, value: string) => {
  const isOpenGraph = key.includes("og:");
  const trimmed = removeKeySpaces(key, value);

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
