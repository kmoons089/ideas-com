import Layout from "../components/Layout";
import "../styles/globals.css";
import "../styles/Home.module.css";
import "../styles/complex.module.css";
import React, { useState } from "react";
import Router from "next/router";
import { Loader } from "../components/Loader";

import nProgress from "nprogress";
nProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
    nProgress.start();
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
    nProgress.done();
  });

  return (
    <>
      {loading && (
        <Layout>
          <Loader />
        </Layout>
      )}
      {!loading && (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
}

export default MyApp;
