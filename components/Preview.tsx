import React from "react";
import Image from "next/image";

const Preview = () => {
  return (
    <section
      className="container container--preview"
      style={{ marginBottom: "24px" }}
    >
      <h2>Preview</h2>

      <figure className="preview">
        <img src="https://home.pokemon.com/assets/img/share/en/share_fb.jpg" />
        <div className="preview-details">
          <h3>Pokemon Home: Price, Features & All You Need to Know</h3>
          <figcaption>
            Here&apos;s a full rundown on the Pokemon cloud storage service.
          </figcaption>
          <a
            href="https://www.cnet.com/tech/gaming/pokemon-home-price-features-and-everything-you-need-to-know/"
            target="_blank"
            rel="noreferrer"
          >
            cnet.com
          </a>
        </div>
      </figure>
    </section>
  );
};

export default Preview;
