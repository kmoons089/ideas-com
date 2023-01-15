import Layout from "../components/Layout";
import "../styles/globals.css";
import "../styles/Home.module.css";
import "../styles/complex.module.css";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { Loader } from "../components/Loader";
import nProgress from "nprogress";
nProgress.configure({ showSpinner: false });
import "bootstrap/dist/css/bootstrap.min.css";

/* ----------------------------- Authentication ----------------------------- */
import { AuthContextProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import ProtectedRoute from "../components/ProtectedRoute";

const noAuthRequired = ["/", "/login", "/register"];

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
    nProgress.start();
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
    nProgress.done();
  });

  useEffect(() => {
    if (noAuthRequired.includes(router.pathname)) {
      null;
    } else {
      console.log("Login require ");
    }
  }, []);

  return (
    <>
      <AuthContextProvider>
        {loading && (
          <Layout>
            <Loader />
          </Layout>
        )}
        {!loading && (
          <Layout>
            {noAuthRequired.includes(router.pathname) ? (
              <Component {...pageProps} />
            ) : (
              <ProtectedRoute>
                <Component {...pageProps} />
              </ProtectedRoute>
            )}
          </Layout>
        )}
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
