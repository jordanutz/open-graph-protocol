import React from "react";
import Option from "./Option";
import Tag from "./Tag";
import { TagProps } from "../types/components";
import { formatValue } from "../helpers/formatValue";
import { AiOutlineTags } from "react-icons/ai";
import { OptionKeys } from "../types/state";

const Form = ({ state, dispatch }) => {
  const { title, description, url, property, content, hasSubmit } = state;

  const initialValue = state.options[0];
  const defaultValue = !property ? formatValue(initialValue, true) : property;

  const isAddDisabled = !(defaultValue && content) || hasSubmit;
  const isResetDisabled =
    !title &&
    !description &&
    !url &&
    !property &&
    !content &&
    !state.tags.length;
  const isSubmitDisabled = !(title && url && state.tags.length) || hasSubmit;

  const options = state.options.map(
    (option: OptionKeys): JSX.Element => <Option key={option} option={option} />
  );
  const tags = state.tags.map((tag: TagProps) => (
    <Tag key={tag.property} {...tag} dispatch={dispatch} />
  ));

  const isEmpty = !state.tags.length;
  const isEmptyModifier = isEmpty ? "tag-container--empty" : "";
  const hasSubmitModifier = hasSubmit ? "form--disabled" : "";

  const tagContent = isEmpty ? (
    <>
      <AiOutlineTags />
      <p>You have not added any tags yet.</p>
    </>
  ) : (
    tags
  );

  return (
    <form
      onSubmit={(event) => dispatch({ type: "HANDLE_SUBMIT", payload: event })}
      className={hasSubmitModifier}
    >
      <div className="form-item">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          onChange={(event) => dispatch({ type: "HANDLE_USER_INPUT", payload: event })}
          type="text"
          value={title}
          disabled={hasSubmit}
          maxLength={100}
          placeholder="Enter the title of your webpage. e.g. Nintendo Switch Sports now released!"
          required
        />
      </div>
      <div className="form-item">
        <label htmlFor="title">Description</label>
        <input
          id="description"
          name="description"
          onChange={(event) => dispatch({ type: "HANDLE_USER_INPUT", payload: event })}
          type="text"
          value={description}
          disabled={hasSubmit}
          maxLength={150}
          placeholder="Enter a description for your webpage."
          required
        />
      </div>
      <div className="form-item">
        <label htmlFor="title">URL</label>
        <input
          id="url"
          name="url"
          onChange={(event) => dispatch({ type: "HANDLE_USER_INPUT", payload: event })}
          type="url"
          value={url}
          disabled={hasSubmit}
          maxLength={200}
          placeholder="https://wwww.myurl.com/"
          required
        />
      </div>
      <div className="form-item">
        <label>Create Custom OG Tag:</label>
        <div className="form-group">
          <select
            id="property"
            name="property"
            onChange={(event) => dispatch({ type: "HANDLE_USER_INPUT", payload: event })}
            value={defaultValue}
            disabled={hasSubmit}
          >
            <>{options}</>
          </select>
          <input
            id="content"
            name="content"
            onChange={(event) => dispatch({ type: "HANDLE_USER_INPUT", payload: event })}
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
            type: "HANDLE_ADD_TAG",
            payload: { e, property: defaultValue, content },
          })
        }
        disabled={isAddDisabled}
      >
        Add OG Tag
      </button>
      <div className="form-item form-item--submit">
        <input
          type="button"
          value="Clear"
          className="form-submit"
          disabled={isResetDisabled}
          onClick={() => dispatch({ type: "HANDLE_RESET" })}
          required
        />
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
