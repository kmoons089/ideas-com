import React, { useEffect, useState } from "react";
import CreateFbPost from "../../../../componentsForPost/CreateFbPost";
import PostsArray from "../../../../componentsForPost/PostsArray";
import PostsCategory from "../../../../componentsForPost/PostsCategory";
import style from "../../../../styles/Layout.module.css";
import { useRouter } from "next/router";

const posts = () => {
  const route = useRouter();
  const id = route.query;

  useEffect(() => {
    console.log("post category ; " + id.id);
  }, []);

  return (
    <div className="d-flex w-100 align-items-center justify-content-center flex-column">
      <div className={style.postArray}>
        <CreateFbPost />
        <PostsArray category={id.id} />
        <PostsCategory />
      </div>
    </div>
  );
};

export default posts;
