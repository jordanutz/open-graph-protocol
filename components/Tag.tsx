import React from 'react';
import { AiOutlineTag } from 'react-icons/ai';

const Tag = ({ property }) => (
    <span className="tag">
        <AiOutlineTag />
        {property}
    </span>
);

export default Tag;