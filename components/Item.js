import articleStyles from "../styles/Article.module.css";
import Link from "next/link";
import style from "../styles/category.module.css";
import router from "next/router";
import Image from "next/image";

const Item = ({ item }) => {
  return (
    <a
      className={style.card}
      onClick={() => {
        router.push(`/${item.title}`, null, { shallow: false });
        console.log("click");
      }}
    >
      <Image src={item.img} className={style.categoryItem} />
      <p>{item.name}</p>
    </a>
  );
};

export default Item;
