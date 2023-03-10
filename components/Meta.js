import Head from "next/head";

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />

      <title>wedontwannathink.com</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "wedontwannathink.com",
  keywords: "web development, programming",
  description: "Get the latest project ideas in web dev",
};

export default Meta;
