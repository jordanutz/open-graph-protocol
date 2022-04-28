import React from "react";
import Head from "next/head";
import Form from "../components/Form";

const Dashboard = () => {
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
