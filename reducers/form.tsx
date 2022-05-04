import ReactDOMServer from 'react-dom/server'
import { createTags } from "../helpers/createTags";
import { filterOptions } from "../helpers/filterOptions";
import { formatValue } from "../helpers/formatValue";

export const initialState = {
  title: "",
  description: "",
  tags: [],
  options: [
    "Audio",
    "Description",
    "Determiner",
    "Image",
    "Locale",
    "Site Name",
    "Title",
    "URL",
    "Video",
  ],
  property: "",
  content: "",
  generatedTags: null,
  hasSubmit: false
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TAG": {
      const { payload } = action;
      const { property, content } = payload;

      payload.e.preventDefault();

      const tag = {
        property,
        content,
      };

      const tags = [...state.tags, tag]
      const options = filterOptions([...state.options], tags);
      const initialValue = formatValue(options[0], true);

      return {
        ...state,
        tags,
        options,
        property: initialValue,
        content: "",
      };
    } break;

    case "HANDLE_USER_INPUT": {
      const { event } = action;
      const { name, value } = event.target;

      return { ...state, [name]: value };
    } break;

    case "HANDLE_SUBMIT": {
      const { event } = action;
      const { tags, title, description } = state;

      event.preventDefault();

        /* Meta:
        Loop through array of tags. Property of each tag needs to be set as the 
        key of the meta object and value needs to be set accordingly. 

        title: "Jordans Grid Container",
        description: "Jordan's Description",
        og:title: "I will overwrite the title"
      */

      const setTags = (tags) => {
        let metaTags = {};

        tags.forEach(tag => {
          const { property, content } = tag;
          metaTags = { ...metaTags, [property]: content }
        })

        return metaTags;
      };

      const meta = {
        title,
        description,
        ...setTags(tags),
      };

      const generatedTags = createTags(meta).map(tag => ReactDOMServer.renderToString(tag)).toString().replace(/,/g, '\n')

      return { 
        ...state, 
        generatedTags,
        hasSubmit: true
      };
    } break;

    default:
      return { ...state };
  }
};
