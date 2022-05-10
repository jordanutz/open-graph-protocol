export type MetaKeys = 
  | "title"
  | "description"
  | "og:title"
  | "og:description"
  | "og:url"
  | "og:type"
  | "og:image"
  | "og:audio"
  | "og:determiner"
  | "og:locale"
  | "og:site_name"
  | "og:video"

export type GeneratedKeys = {
  [key: string]: string;
}