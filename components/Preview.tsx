import React from "react";
import Image from "next/image";

import Placeholder from "../assets/default.png"

const Preview = ({ state }) => {
  const imageTag = state.tags.length && state.hasSubmit && state.tags.find(tag => tag.property === "og:image")
  console.log(imageTag)

  console.log(state)
  const content = state.hasSubmit ? (
    <section className="container container--preview">
      <h2>Preview</h2>
      <figure className="preview">
        <div className="preview-img">
          <Image
            src={imageTag ? imageTag.content : 'Image not supported.'}
            alt={state.title}
            layout="fill"
            unoptimized={true}
          />
        </div>
        <div className="preview-details">
          <h3>{state.title}</h3>
          <figcaption>{state.description}</figcaption>
          <a href={state.url} target="_blank" rel="noreferrer">
            arstechnica.com
          </a>
        </div>
      </figure>
    </section>
  ) : (
    <section className="container container--preview container--skeleton">
      <h2>Preview</h2>
      <figure className="preview">
        <div className="preview-img">
          <Image
            src={Placeholder.src}
            alt=""
            role="presentation"
            layout="fill"
          />
        </div>
        <div className="preview-details">
          <h3>
            {/* <!-- waiting for user to make submission --> */}
          </h3>
          <figcaption>
             {/* <!-- waiting for user to make submission --> */}
          </figcaption>
          <a target="_blank" rel="noreferrer">
            {/* <!-- waiting for user to make submission --> */}
          </a>
        </div>
      </figure>
    </section>
  );

  return content;
};

export default Preview;
