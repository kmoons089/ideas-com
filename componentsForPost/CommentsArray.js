import React, { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import FirestoreServiceForPosts from "../utils/FirestoreServiceForPosts";
import Comments from "./Comments";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firestore";

const CommentsArray = ({ commentsArray }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const auth = useAuth();
  const [reverseArray, setReverseArray] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      if (route.pathname == "/posts/[id]") {
        const id = route.query;
        console.log(id.id);
        await FirestoreServiceForPosts.getSinglePost(id.id).then((response) => {
          console.log(
            response._delegate._document.data.value.mapValue.fields.comments
              .arrayValue.values
          );

          setComments(
            response._delegate._document.data.value.mapValue.fields.comments
              .arrayValue.values
          );

          // setComments({
          //   ...comments,
          //   data: response._delegate._snapshot.docChanges[0].doc.data.value
          //     .mapValue.fields.comments.arrayValue,
          // });
        });
      }
    };
    getData().then(() => {
      setLoading(false);
      //console.log(comments);
    });
  }, []);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {}, [comments]);

  useEffect(() => {
    // console.log(typeof comments == "object");

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [comments]);

  if (typeof comments !== "object") {
    return (
      <Container className="d-flex flex-column w-100  ">
        <p>No Comments</p>
      </Container>
    );
  } else if (comments.length > 0) {
    return (
      <Container className="d-flex flex-column w-100  ">
        <p>Comments</p>

        {comments.map((id, index) => (
          <Comments id={id} key={index} />
        ))}
        <div ref={messagesEndRef} />
      </Container>
    );
  }
};

export default CommentsArray;
