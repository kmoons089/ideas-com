import React, { useState, useEffect } from "react";
import CategoryStyle from "../styles/category.module.css";
import articleStyles from "../styles/Article.module.css";
import Item from "./Item";
import html from "../public/img/htmllogo.png";
import java from "../public/img/javalogo.png";
import pp from "../public/img/pplogo.png";
import ct from "../public/img/ctlogo.png";
import Container from "react-bootstrap/Container";

const Category = () => {
  const [category, setCategory] = useState([
    {
      name: " HTML projects , you can do with your homies",
      img: html,
      title: "html",
    },
    {
      name: "JAVA projects , you can do with your depression",
      img: java,
      title: "java",
    },
    { name: "Tips for your power point presentation", img: pp, title: "pp" },
    {
      name: "Hardware Projects to do with your girlfriend",
      img: ct,
      title: "hw",
    },
  ]);

  return (
    <Container>
      <br></br>
      <h1 className="wow animate__animated animate__fadeInUp text-center">
        CHOOSE THE PROJECT
      </h1>
      <div className={CategoryStyle.cards}>
        {category.map((item) => (
          <Item item={item} key={item.name} />
        ))}
      </div>
    </Container>
  );
};

export default Category;
