import React from "react";
import { CopyBlock, shadesOfPurple } from "react-code-blocks";

const Generated = ({ state }) => {

  const { generatedTags } = state;

  return (
    <section className="container">
      <h2>Code</h2>
      <p>
        Copy and paste the following tags into the <strong>head</strong> of your
        document once your tags are generated:{" "}
      </p>
      <div className="generated">
        <CopyBlock
          text={generatedTags || ''}
          showLineNumbers={false}
          language="html"
          wrapLines={true}
          theme={shadesOfPurple}
          codeBlock
        />
      </div>
    </section>
  );
};

export default Generated;
