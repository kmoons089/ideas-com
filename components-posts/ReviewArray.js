import react, { useState, useEffect } from "react";

import Review from "./Review";

import FirestoreService from "../utils/FirestoreService";
import { Loader } from "../components/Loader";
import { Container } from "react-bootstrap";
import bg from "../public/img/reviewBg.svg";
//style
import gridStyle from "../styles/Article.module.css";

const ReviewArray = ({ mode, props, parent_email }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noPost, setNoPost] = useState(false);
  // const handleEdit = () => {
  //   props.handleEdit();
  // };

  useEffect(() => {
    setLoading(true);
    if (mode == "add") {
      FirestoreService.getAllReviews()
        .then((response) => {
          setPosts(response._delegate._snapshot.docChanges);

          if (response._delegate._snapshot.docChanges.length < 1) {
            console.log("no post");
            setNoPost(true);
          } else {
            setNoPost(false);
          }
        })
        .then(() => {
          setLoading(false);
        })
        .catch((e) => {
          console.log("Error occured while fetching reviewArray " + e);
        });
    } else if (mode == "edit") {
      console.log("parent email : " + parent_email);
      FirestoreService.getProfilePosts(parent_email)

        .then((response) => {
          setPosts(response._delegate._snapshot.docChanges);
          console.log(response._delegate._snapshot.docChanges);
          if (response._delegate._snapshot.docChanges.length < 1) {
            console.log("no post");
            setNoPost(true);
          } else {
            setNoPost(false);
            console.log(" post");
          }
        })
        .then(() => {
          setLoading(false);
        })
        .catch((e) => {
          console.log("Error occured while fetching reviewArray " + e);
          console.log(e);
        });
    }
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Container className="d-flex w-100 h-100 align-items-center justify-content-center text-muted  text-dark mt-10">
            {" "}
            <Loader />
          </Container>
        </>
      ) : (
        <>
          {noPost ? (
            <>
              <Container className="d-flex w-100 h-100 align-items-center justify-content-center text-muted  text-dark mt-10">
                <h1>NO POST YET.</h1>
              </Container>
            </>
          ) : (
            <>
              <div className={gridStyle.grid}>
                {posts.map((article, index) => (
                  <Review
                    article={article}
                    mode={mode}
                    key={index}
                    parent_email={parent_email}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ReviewArray;
