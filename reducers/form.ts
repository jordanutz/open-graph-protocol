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
    "Locale",
    "Site Name",
    "Title",
    "Type",
    "Video",
  ],
  setInitialProperty: function (filtered) {
    return filtered ? filtered[0] : this.options[0];
  },
  property: "",
  content: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TAG":
      const { payload } = action;
      const { e, property, content } = payload;

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
      break;

    case "HANDLE_USER_INPUT":
      const { event } = action;
      const { name, value } = event.target;

      return { ...state, [name]: value };
      break;

    case "SUBMIT_FORM":
      return { ...state };
      break;

    default:
      return { ...state };
  }
};
