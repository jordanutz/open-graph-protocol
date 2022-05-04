import React from "react";
import Image from "next/image";

const Preview = () => {
  return (
    <section className="container container--preview">
      <h2>Preview</h2>
      <figure className="preview">
        <div className="preview-img">
          <Image 
            src="https://assets.nintendo.com/image/upload/c_fill,f_auto,q_auto,w_1200/v1/ncom/en_US/games/switch/p/pokemon-unite-switch/hero"
            alt="Pokémon announces Nintendo Switch launch date for Pokémon UNITE"
            layout='fill'
            unoptimized={true}
          />
        </div>
        <div className="preview-details">
          <h3>Pokémon announces Nintendo Switch launch date for Pokémon UNITE</h3>
          <figcaption>
            The free-to-play MOBA Pokémon Unite is coming to Nintendo Switch on July 21, The Pokémon Company announced Thursday.
          </figcaption>
          <a
            href="https://www.nintendo.com/whatsnew/detail/2021/pokemon-announces-nintendo-switch-launch-date-for-pokemon-unite/"
            target="_blank"
            rel="noreferrer"
          >
            nintendo.com
          </a>
        </div>
      </figure>
    </section>
  );
};

export default Preview;
