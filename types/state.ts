import { GeneratedProps, PreviewProps, Tag } from "./components";

export type OptionKeys =
  | "Audio"
  | "Description"
  | "Determiner"
  | "Image"
  | "Locale"
  | "Site Name"
  | "Title"
  | "Video";

export interface StateProps extends GeneratedProps, PreviewProps, Tag {
  options: OptionKeys[];
};

export interface ActionProps {
  type: string;
  payload: any;
};
