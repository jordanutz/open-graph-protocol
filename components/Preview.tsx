import React from "react";
import Image from "next/image";
import Placeholder from "../assets/default.png";
import { PreviewProps, Tag } from "../types/components";

const Preview = ({ title, description, url, tags, hasSubmit }: PreviewProps) => {
  const imageTag =
    tags.length &&
    hasSubmit &&
    tags.find((tag: Tag) => tag.property === "og:image");
  const domain =
    tags.length && hasSubmit ? new URL(url).hostname : null;
  const content = hasSubmit ? (
    <section className="container container--preview">
      <h2>Preview</h2>
      <figure className="preview">
        <div className="preview-img">
          <Image
            src={imageTag ? imageTag.content : Placeholder.src}
            alt={title}
            layout="fill"
            unoptimized={true}
            priority
          />
        </div>
        <div className="preview-details">
          <h3>{title}</h3>
          <figcaption>{description}</figcaption>
          <a href={url} target="_blank" rel="noreferrer">
            {domain}
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
          <h3>{/* <!-- waiting for user to make submission --> */}</h3>
          <figcaption>
            {/* <!-- waiting for user to make submission --> */}
          </figcaption>
          <a href={"#"} target="_blank" rel="noreferrer">
            {/* <!-- waiting for user to make submission --> */}
          </a>
        </div>
      </figure>
    </section>
  );

  return content;
};

export default Preview;
