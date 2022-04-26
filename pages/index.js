import React, { createElement, useEffect, useRef } from "react";
import Head from "next/head";
import { Helmet } from "react-helmet";

import Form from "../components/Form.tsx";

const Dashboard = () => {
  const path = useRef();

  useEffect(() => {
    path.current = window.location.href;
  }, []);

  const meta = {
    title: "This is a title",
    description: "this is a description",
  };

  const assembleProps = (key, value) => {
    const isRedirect = key === "redirect";
    const isOpenGraph = key.includes("og:");

    const props = {
      key: `${key}-${value}`,
      content: value,
    };

    if (isRedirect) {
      props.httpEquiv = "refresh";
      return props;
    }

    if (isOpenGraph) {
      props.property = key;
      return props;
    }

    props.name = key;
    return props;
  };

  const renderTag = (key, value) => {
    const isTitle = key === "title";

    const type = isTitle ? "title" : "meta";
    const props = !isTitle && { ...assembleProps(key, value) };
    const children = isTitle && value;

    return createElement(type, props, children);
  };

  const generateOpenGraphKeys = (meta) => {
    const obj = { ...meta };

    Object.keys(meta).forEach((key) => {
      const isOpenGraph = key.includes("og:");
      const openGraphKey = `og:${key}`;

      if (isOpenGraph) {
        const keyToOverwrite = key.includes("og:");
        const openGraphOverwritten = `og:${keyToOverwrite}`;

        obj[keyToOverwrite] = meta[key];
        obj[openGraphOverwritten] = meta[openGraphOverwritten];
        return;
      }

      obj[openGraphKey] = meta[key];
    });

    return obj;
  };

  const appendTags = (meta) => {
    const tags = [];

    const generatedKeys = generateOpenGraphKeys(meta);
    const hasOpenGraphImage = "og:image" in generatedKeys;

    Object.keys(generatedKeys).forEach((key) => {
      const value = generatedKeys[key];

      if (value === "") return;

      const tag = renderTag(key, value);
      tags.push(tag);

      return;
    });

    if (!hasOpenGraphImage) {
      const logo = "insert path to logo here";
      const openGraphImageTag = renderTag("og:image", logo);

      tags.push(openGraphImageTag);
    }

    const openGraphUrlTag = renderTag("og:url", path);

    tags.push(openGraphUrlTag);

    return <Helmet>{tags}</Helmet>;
  };

  return (
    <>
      <Head>
        <title>Open Graph Protocol | Jordan Utz</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <section className="container">
        <div className="description">
          <h1>Open Graph Protocol</h1>
          <p>
            The <strong>Open Graph Protocol</strong> transforms your web pages
            into graph objects using information from custom meta tags you
            inject into the head of your document.
          </p>
        </div>
        <Form />
      </section>
    </>
  );
};

export default Dashboard;
