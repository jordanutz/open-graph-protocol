import React, { useState } from "react";

const Form = ({ appendTags }) => {
  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    tags: [],
  });

  const { title, description, tags } = userInput;

  return (
    <form onSubmit={appendTags}>
      <div className="form-item">
        <label htmlFor="title">Title</label>
        <input 
          id="title" 
          name="title" 
          onChange={(e) => console.log(e)} 
          type="text" 
        />
      </div>
      <div className="form-item">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          onChange={(e) => console.log(e)}
          type="text"
        />
      </div>
      <div className="form-item">
        <label>Create Custom OG Tag:</label>
        <div className="form-group">
          <select id="create">
            <option value="og:audio">Audio</option>
            <option value="og:description">Description</option>
            <option value="og:determiner">Determiner</option>
            <option value="og:locale">Locale</option>
            <option value="og:site_name">Site Name</option>
            <option value="og:video">Video</option>
          </select>
          <input type="text" id="property" placeholder="Value that will be set as the property to the tag." />
        </div>
      </div>
      <div className="tag-container"></div>
      <button>Add OG Tag</button>
      <div className="form-item">
        <input type="submit" value="Try it out!" />
      </div>
    </form>
  );
};

export default Form;
