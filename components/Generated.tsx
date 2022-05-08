import React from "react";
import { CopyBlock, shadesOfPurple } from "react-code-blocks";
import { GeneratedProps } from "../types/components";

const Generated = ({ generatedTags }: GeneratedProps) => (
  <section className="container">
    <h2>Code</h2>
    <p>
      Copy and paste the following tags into the <strong>head</strong> of your
      document:{" "}
    </p>
    <div className="generated">
      <CopyBlock
        text={generatedTags || ""}
        showLineNumbers={false}
        language="html"
        wrapLines={true}
        theme={shadesOfPurple}
        codeBlock
      />
    </div>
  </section>
);

export default Generated;
