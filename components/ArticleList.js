import ArticleItem from "./ArticleItem";
import articleStyles from "../styles3/Article.module.css";
import Footer from "./Footer";

import { articles } from "../data";

const ArticleList = ({ category }) => {
  return (
    <div className={articleStyles.category}>
      <div className={articleStyles.grid}>
        {articles
          .filter((article) => article.category == category)
          .map((article) => (
            <ArticleItem article={article} key={article.id} />
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default ArticleList;
