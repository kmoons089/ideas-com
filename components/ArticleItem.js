import articleStyles from "../styles/Article.module.css";
import Image from "next/image";

const ArticleItem = ({ article }) => {
  return (
    // <Link href={`/article/${article.id}`}>
    <>
      <a className={articleStyles.card}>
        <h1 className="wow animate__animated animate__fadeInUp ">
          {article.title}{" "}
        </h1>

        <p className="wow animate__animated animate__fadeInUp ">
          {article.body}
        </p>
        <Image
          className="wow animate__animated animate__fadeInUp "
          src={article.img}
        />
      </a>
      <script src="./wow.min.js"></script>
      <script>new WOW().init();</script>
    </>
    // </Link>
  );
};

export default ArticleItem;
