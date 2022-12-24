import Link from "next/link";
import navStyles from "../styles/Nav.module.css";
import ArticleList from "./ArticleList";

const Menubar = ({ articles }) => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <ArticleList articles={articles} category="html" />
        </li>
        <li></li>
        <li></li>
      </ul>
    </nav>
  );
};

export default Menubar;
