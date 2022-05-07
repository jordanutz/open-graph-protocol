import React from "react";
import { AiOutlineTag } from "react-icons/ai";

const Tag = ({ property, dispatch }) => (
  <span
    className="tag"
    onClick={() => dispatch({ type: "HANDLE_DELETE_TAG", property })}
  >
    <AiOutlineTag />
    {property}
  </span>
);

export default Tag;
