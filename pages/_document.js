import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
            integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"
            crossOrigin="true"
          ></script>

          <script
            src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
            crossOrigin="true"
          ></script>

          <script
            src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
            crossOrigin="true"
          ></script>

          <script>var Alert = ReactBootstrap.Alert;</script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
