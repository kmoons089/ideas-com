import Meta from "../components/Meta";
import ArticleList from "../components/ArticleList";
import { server } from "../config";
import BigScreen from "../components/BigScreen";

const list = ({ articles }) => {
  return (
    <div>
      <Meta title="List" />
      <BigScreen category="hw" />
      <ArticleList articles={articles} category="hw" />
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
