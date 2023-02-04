import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Post from "../../../componentsForPost/Post";
import { Container } from "react-bootstrap";
import CommentsArray from "../../../componentsForPost/CommentsArray";
import FirestoreServiceForPosts from "../../../utils/FirestoreServiceForPosts";
import { Button } from "react-bootstrap";
import CreateComments from "../../../componentsForPost/CreateComments";
import LIkedProfilesArray from "../../../componentsForPost/LIkedProfilesArray";

const post = ({ post_id }) => {
  const route = useRouter();
  const id = route.query;

  //let dataArray = {};
  const [dataArray, setDataArray] = useState([]);
  const [data, setData] = useState({
    pfImg: "",
    displayName: "",
    owner_email: "",
    body: "",
  });

  useEffect(() => {
    console.log("single post");
  }, []);

  return (
    <>
      <Container>
        <div className="row w-100 ">
          <div className="col-sm-6 d-flex flex-column  justify-content-start">
            {/* <Button onClick={handleComment}>Create Comments</Button> */}
            <Post />
            <LIkedProfilesArray />
          </div>
          <div className="col-sm-6 d-flex align-items-start flex-column">
            <CreateComments />
            <CommentsArray />
          </div>
        </div>
      </Container>
    </>
  );
};

export default post;
