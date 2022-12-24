import Meta from "../components/Meta";
import ArticleList from "../components/ArticleList";
// import { server } from "../config";

const list = ({ articles }) => {
  return (
    <div>
      <Meta title="List" />
      <h1>List</h1>
      <ArticleList />
    </div>
  );
};

export default list;
