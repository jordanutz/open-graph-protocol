import { Tag } from "../types/components";
import { OptionKeys } from "../types/state";
import { formatValue } from "./formatValue";

export const filterOptions = (arr: OptionKeys[], tags: Tag[]) => {
  const filtered = arr.filter((option: OptionKeys) => {
    const formatted = formatValue(option, true);
    let isIncluded = false;

    tags.forEach((tag: Tag) => {
      if (formatted === tag.property) {
        isIncluded = true;
      }
    });

    return !isIncluded;
  });

  return filtered;
};
