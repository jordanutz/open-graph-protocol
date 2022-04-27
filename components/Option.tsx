import React from "react";
import { formatValue } from "../helpers/formatValue";

const Option = ({ option }) => {
  const value = formatValue(option, true);

  return (
    <option key={value} value={value}>
      {option}
    </option>
  );
};

export default Option;
