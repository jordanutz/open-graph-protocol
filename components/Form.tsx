import React from "react";
import Option from "./Option";
import Tag from "./Tag";
import { formatValue } from "../helpers/formatValue";
import { AiOutlineTags } from "react-icons/ai";

const Form = ({ state, dispatch }) => {
  const { title, description, property, content, hasSubmit } = state;

  const initialValue = state.options[0];
  const defaultValue = !property ? formatValue(initialValue, true) : property;

  const isAddDisabled = !(defaultValue && content) || hasSubmit;
  const isSubmitDisabled =
    !(title && description && state.tags.length) || hasSubmit;

  const options = state.options.map((option) => (
    <Option key={option} option={option} />
  ));
  const tags = state.tags.map((tag) => <Tag key={tag.property} {...tag} />);

  const isEmpty = !state.tags.length;
  const isEmptyModifier = isEmpty ? 'tag-container--empty' : '';
  const hasSubmitModifier = isSubmitDisabled ? 'form--disabled' : '';
  const tagContent = isEmpty ? (
    <>
      <AiOutlineTags />
      <p>You have not added any tags yet.</p>
    </>
  ) : (
    tags
  );

  return (
    <form onSubmit={(event) => dispatch({ type: "HANDLE_SUBMIT", event })} className={hasSubmitModifier}>
      <div className="form-item">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          onChange={(event) => dispatch({ type: "HANDLE_USER_INPUT", event })}
          type="text"
          value={title}
          disabled={hasSubmit}
        />
      </div>
      <div className="form-item">
        <label htmlFor="title">Description</label>
        <input
          id="description"
          name="description"
          onChange={(event) => dispatch({ type: "HANDLE_USER_INPUT", event })}
          type="text"
          value={description}
          disabled={hasSubmit}
        />
      </div>
      <div className="form-item">
        <label>Create Custom OG Tag:</label>
        <div className="form-group">
          <select
            id="property"
            name="property"
            onChange={(event) => dispatch({ type: "HANDLE_USER_INPUT", event })}
            value={defaultValue}
            disabled={hasSubmit}
          >
            <>{options}</>
          </select>
          <input
            id="content"
            name="content"
            onChange={(event) => dispatch({ type: "HANDLE_USER_INPUT", event })}
            placeholder="Value that will be set as the content of the tag."
            type="text"
            value={content}
            disabled={hasSubmit}
          />
        </div>
      </div>
      <div className={`tag-container ${isEmptyModifier}`}>{tagContent}</div>
      <button
        onClick={(e) =>
          dispatch({
            type: "ADD_TAG",
            payload: { e, property: defaultValue, content },
          })
        }
        disabled={isAddDisabled}
      >
        Add OG Tag
      </button>
      <div className="form-item">
        <input
          type="submit"
          value="Generate Tags"
          className="form-submit"
          disabled={isSubmitDisabled}
        />
      </div>
    </form>
  );
};

export default Form;
