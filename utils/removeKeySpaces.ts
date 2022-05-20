export const removeKeySpaces = (key: string, value: string): string =>
  `${key}-${value}`.replace(/\s+/g, "");
