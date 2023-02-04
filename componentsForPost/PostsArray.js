import react, { useState, useEffect } from "react";

import { Loader } from "../components/Loader";
import { Container } from "react-bootstrap";

import Post from "./Post";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import FirestoreServiceForPosts from "../utils/FirestoreServiceForPosts";

const PostsArray = ({ parent_email, category }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noPost, setNoPost] = useState(false);
  const route = useRouter();
  const id = route.query;
  const auth = useAuth();
  let mode;
  const email = route.query.data;
  // const handleEdit = () => {
  //   props.handleEdit();
  // };

  useEffect(() => {
    //edit : private
    //add : public
    setLoading(true);
    console.log(id.id);
    if (route.pathname === "/profiles/[id]") {
      mode = "edit";
    } else if (route.pathname === "/profile") {
      mode = "own";
    } else {
      mode = "add";
    }
    console.log("mode : " + mode);
    //mode "add" is get all posts
    // edit is own profile : private
    if (mode == "add") {
      console.log(category);
      if (category !== "all") {
        console.log("get post category : " + category);
        FirestoreServiceForPosts.getCategoryPosts(category)
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
            console.log("Error occured while fetching the menu item. " + e);
          });
      } else {
        console.log("get all posts");
        FirestoreServiceForPosts.getAllPosts()
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
            console.log("Error occured while fetching postArray " + e);
          });
      }
    } else if (mode == "edit") {
      FirestoreServiceForPosts.getProfilePosts(id.id)

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
          console.log("Error occured while fetching postArray " + e);
          console.log(e);
        });
    } else if (mode === "own") {
      FirestoreServiceForPosts.getProfilePosts(auth.user.email)

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
          console.log("Error occured while fetching postArray " + e);
          console.log(e);
        });
    }
    console.log(posts.length);
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Container className="d-flex w-100 h-100 align-items-center justify-content-center text-muted  text-dark mt-10">
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
              <div className="d-flex w-100 flex-column p-2 align-items-center">
                {posts.map((article, index) => (
                  <Post
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

export default PostsArray;
