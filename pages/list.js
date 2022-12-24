import Meta from "../components/Meta";
import ArticleList from "../components/ArticleList";
import { server } from "../config";

const list = ({ articles }) => {
  return (
    <div>
      <Meta title="List" />
      <h1>List</h1>
      <ArticleList articles={articles} />
    </div>
  );
};

export default list;

export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/articles`);
  const articles = await res.json();

  return {
    props: {
      articles,
    },
  };
};
