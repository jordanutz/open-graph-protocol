import ReactDOMServer from "react-dom/server";

import { createTags } from "../helpers/createTags";
import { filterOptions } from "../helpers/filterOptions";
import { formatValue } from "../helpers/formatValue";

import { StateProps } from "../types/state";

export const initialState: StateProps = {
  title: "",
  description: "",
  url: "",
  tags: [],
  options: [
    "Audio",
    "Description",
    "Determiner",
    "Image",
    "Locale",
    "Site Name",
    "Title",
    "Video",
  ],
  property: "",
  content: "",
  generatedTags: null,
  hasSubmit: false,
};

export const reducer = (state: StateProps, action) => {
  switch (action.type) {
    case "HANDLE_ADD_TAG":
      {
        const { payload } = action;
        const { property, content } = payload;

        payload.e.preventDefault();

        const tag = {
          property,
          content,
        };

        const tags = [...state.tags, tag];
        const options = filterOptions([...state.options], tags);
        const initialValue = formatValue(options[0], true);

        return {
          ...state,
          tags,
          options,
          property: initialValue,
          content: "",
        };
      }
      break;
    case "HANDLE_DELETE_TAG":
      {
        const tagsArr = [...state.tags];
        const deletedIndex = tagsArr.findIndex(
          (tag) => tag.property === action.payload.property
        );

        tagsArr.splice(deletedIndex, 1);

        return {
          ...state,
          tags: tagsArr,
        };
      }
      break;
    case "HANDLE_USER_INPUT":
      {
        const { event } = action;
        const { name, value } = event.target;

        return { ...state, [name]: value };
      }
      break;

    case "HANDLE_SUBMIT":
      {
        const { event } = action;
        const { tags, title, description, url } = state;

        event.preventDefault();

        const setTags = (tags) => {
          let metaTags = {};

          tags.forEach((tag) => {
            const { property, content } = tag;
            metaTags = { ...metaTags, [property]: content };
          });

          return metaTags;
        };

        const meta = {
          title,
          description,
          "og:url": url,
          ...setTags(tags),
        };

        const generatedTags = createTags(meta)
          .map((tag) => ReactDOMServer.renderToString(tag))
          .toString()
          .replace(/,/g, "\n");

        return {
          ...state,
          generatedTags,
          hasSubmit: true,
        };
      }
      break;

    case "HANDLE_RESET":
      {
        return {
          ...state,
          ...initialState,
        };
      }
      break;
    default:
      return { ...state };
  }
};
