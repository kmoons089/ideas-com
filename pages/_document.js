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
          {/* <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          ></link> */}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          ></link>
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

          <script
            src="https://kit.fontawesome.com/a076d05399.js"
            crossOrigin="anonymous"
          ></script>
          {/* <script
            src="/docs/5.0/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossOrigin="anonymous"
          ></script> */}
          <script src="https://smtpjs.com/v3/smtp.js"></script>
          <script>var Alert = ReactBootstrap.Alert;</script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
