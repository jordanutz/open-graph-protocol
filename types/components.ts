import { ReactElement } from "react";
import { OptionKeys } from "./state";

export interface GeneratedProps {
    generatedTags: ReactElement[];
};

export interface OptionProps {
    option: OptionKeys
};

export interface Tag {
    property: string;
    content: string;
};

export interface TagProps extends Tag {
    dispatch: ({ type: string, payload: unknown }) => void
};

export interface PreviewProps {
    title: string; 
    description: string;
    url: string; 
    tags: TagProps[];
    hasSubmit: boolean
};