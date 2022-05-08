import { OptionKeys, StateProps } from "./state";

type DispatchProps = {
    type: string;
    payload?: any;
}

export interface FormProps extends StateProps {
    dispatch: ({type, payload}: DispatchProps)  => void 
};

export interface GeneratedProps {
    generatedTags: string;
};

export interface OptionProps {
    option: OptionKeys
};

export interface PreviewProps {
    title: string; 
    description: string;
    url: string; 
    tags: Tag[];
    hasSubmit: boolean
};

export interface Tag {
    property: string;
    content: string;
};

export interface TagProps extends Tag {
    dispatch: ({type, payload}: DispatchProps)  => void 
};