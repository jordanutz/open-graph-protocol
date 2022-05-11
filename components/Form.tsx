import React from "react";
import Option from "./Option";
import Tag from "./Tag";
import { FormProps, TagProps } from "../types/components";
import { OptionKeys } from "../types/state";
import { formatValue } from "../utils/formatValue";
import { AiOutlineTags } from "react-icons/ai";

const Form = ({
  title,
  description,
  url,
  tags,
  options,
  property,
  content,
  hasSubmit,
  dispatch,
}: FormProps) => {
  const initialValue = options[0];
  const defaultValue = !property ? formatValue(initialValue, true) : property;

  const isAddDisabled = !(defaultValue && content) || hasSubmit;
  const isResetDisabled =
    !title && !description && !url && !property && !content && !tags.length;
  const isSubmitDisabled = !(title && url && tags.length) || hasSubmit;

  const renderOptions = options.map(
    (option: OptionKeys): JSX.Element => <Option key={option} option={option} />
  );
  const renderTags = tags.map((tag: TagProps) => (
    <Tag key={tag.property} {...tag} dispatch={dispatch} />
  ));

  const isEmpty = !tags.length;
  const isEmptyModifier = isEmpty ? "tag-container--empty" : "";
  const hasSubmitModifier = hasSubmit ? "form--disabled" : "";

  const tagContent = isEmpty ? (
    <>
      <AiOutlineTags />
      <p>You have not added any tags yet.</p>
    </>
  ) : (
    renderTags
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
          onChange={(event) =>
            dispatch({ type: "HANDLE_USER_INPUT", payload: event })
          }
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
          onChange={(event) =>
            dispatch({ type: "HANDLE_USER_INPUT", payload: event })
          }
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
          onChange={(event) =>
            dispatch({ type: "HANDLE_USER_INPUT", payload: event })
          }
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
            onChange={(event) =>
              dispatch({ type: "HANDLE_USER_INPUT", payload: event })
            }
            value={defaultValue}
            disabled={hasSubmit}
          >
            <>{renderOptions}</>
          </select>
          <input
            id="content"
            name="content"
            onChange={(event) =>
              dispatch({ type: "HANDLE_USER_INPUT", payload: event })
            }
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
