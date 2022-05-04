import React, { useReducer } from "react";
import Head from "next/head";

import Form from "../components/Form";
import Generated from "../components/Generated";
import Preview from "../components/Preview";

import { initialState, reducer } from "../reducers/form";

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Head>
        <title>Open Graph Tag Generator | Jordan Utz</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <section className="container">
        <div className="description">
          <h1>Open Graph Tag Generator</h1>
          <p>
            The <strong>Open Graph Protocol</strong> transforms your web pages
            into graph objects using information from custom meta tags you
            inject into the head of your document. Let&apos;s give it a shot!
          </p>
        </div>
        <Form state={state} dispatch={dispatch} />
      </section>
      <div className="content">
        <Preview />
        <Generated state={state} />
      </div>
    </>
  );
};

export default App;
