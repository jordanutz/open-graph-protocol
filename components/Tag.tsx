import React from "react";
import { AiOutlineTag } from "react-icons/ai";
import { TagProps } from "../types/components";


const Tag = ({ property, dispatch }: TagProps): JSX.Element => (
  <span
    className="tag"
    onClick={() => dispatch({ type: "HANDLE_DELETE_TAG", payload: property })}
  >
    <AiOutlineTag />
    {property}
  </span>
);

export default Tag;
