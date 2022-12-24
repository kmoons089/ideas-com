import Meta from "../components/Meta";
import ArticleList from "../components/ArticleList";
// import { server } from "../config";
import BigScreen from "../components/BigScreen";

const list = ({ articles }) => {
  return (
    <div>
      <Meta title="List" />
      <BigScreen category="hw" />
      <ArticleList category="hw" />
    </div>
  );
};

export default list;
