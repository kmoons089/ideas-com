import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import LikedProfile from "./LikedProfile";
import FirestoreServiceForPosts from "../utils/FirestoreServiceForPosts";
import { Container } from "react-bootstrap";

const LIkedProfilesArray = () => {
  const route = useRouter();
  const auth = useAuth();
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      if (route.pathname == "/posts/[id]") {
        const id = route.query;
        console.log(id.id);
        await FirestoreServiceForPosts.getSinglePost(id.id).then((response) => {
          console.log(
            response._delegate._document.data.value.mapValue.fields.likes
          );
          setLikes(
            response._delegate._document.data.value.mapValue.fields.likes
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

  useEffect(() => {
    console.log(likes);
  }, [likes]);
  if (typeof likes !== "object") {
    return (
      <Container className="d-flex flex-column w-100  ">
        <p>No Likes</p>
      </Container>
    );
  } else if (likes.length > 0) {
    return (
      <Container className="d-flex flex-column w-100  ">
        <p>Likes</p>

        {likes.map((id, index) => (
          <LikedProfile email={id} key={index} />
        ))}
      </Container>
    );
  }
};

export default LIkedProfilesArray;
