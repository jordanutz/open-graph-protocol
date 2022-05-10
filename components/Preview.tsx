import React from "react";
import Image from "next/image";
import Placeholder from "../assets/default.png";
import { PreviewProps, Tag } from "../types/components";

const Preview = ({
  title,
  description,
  url,
  tags,
  hasSubmit,
}: PreviewProps) => {
  const imageTag =
    tags.length &&
    hasSubmit &&
    tags.find((tag: Tag) => tag.property === "og:image");
  const domain = tags.length && hasSubmit ? new URL(url).hostname : null;

  const previewDetails = hasSubmit ? (
    <>
      <h3>{title}</h3>
      <figcaption>{description}</figcaption>
      <a href={url} target="_blank" rel="noreferrer">
        {domain}
      </a>
    </>
  ) : null;

  const previewImage = hasSubmit ? (
    <Image
      src={imageTag ? imageTag.content : Placeholder.src}
      alt={title}
      layout="fill"
      unoptimized={true}
      priority
    />
  ) : (
    <Image src={Placeholder.src} alt="" role="presentation" layout="fill" />
  );

  const skeletonModifier = !hasSubmit ? "container--skeleton" : ""

  return (
    <section className={`container container--preview ${skeletonModifier}`}>
      <h2>Preview</h2>
      <figure className="preview">
        <div className="preview-img">{previewImage}</div>
        <div className="preview-details">{previewDetails}</div>
      </figure>
    </section>
  );
};

export default Preview;
