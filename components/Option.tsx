import React from "react";
import { formatValue } from "../utils/formatValue";
import { OptionProps } from "../types/components"

const Option = ({ option }: OptionProps): JSX.Element => {
  const value = formatValue(option, true);

  return (
    <option key={value} value={value}>
      {option}
    </option>
  );
};

export default Option;
