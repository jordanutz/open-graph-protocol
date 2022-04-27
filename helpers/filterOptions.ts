import { formatValue } from "./formatValue";

export const filterOptions = (arr, tags) => {
  const filtered = arr.filter((option) => {
    const formatted = formatValue(option, true);
    let isIncluded = false;

    tags.forEach((tag) => {
      if (formatted === tag.property) {
        isIncluded = true;
      }
    });

    return !isIncluded;
  });

  return filtered;
};
