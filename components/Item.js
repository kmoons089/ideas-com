import style from "../styles/category.module.css";
import router from "next/router";
import Image from "next/image";

const Item = ({ item }) => {
  return (
    <a
      style={{ textDecoration: "none", textAlign: "center" }}
      className={style.card}
      onClick={() => {
        router.push(`/${item.title}`, null, { shallow: false });
        console.log("click");
      }}
    >
      <Image src={item.img} className={style.categoryItem} alt="" />
      <p>{item.name}</p>
    </a>
  );
};

export default Item;
