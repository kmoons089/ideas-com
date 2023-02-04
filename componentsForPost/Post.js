import React, { useEffect, useState } from "react";

import Link from "next/link";
import {
  MDBCard,
  MDBModalDialog,
  MDBModalContent,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTextArea,
  MDBInput,
  MDBSpinner,
} from "mdb-react-ui-kit";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import FirestoreService from "../utils/FirestoreService";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CreateReviewForm from "../components/RatingStar_read";
import CreateReview from "../components/CreateReview";
import RatingStar_read from "../components/RatingStar_read";
import { useRouter } from "next/router";
import CommentsArray from "./CommentsArray";
import FirestoreServiceForPosts from "../utils/FirestoreServiceForPosts";

export default function Post({ article, mode = "add", parent_email }) {
  const useAsyncState = (initialState) => {
    const [state, setState] = useState(initialState);

    const asyncSetState = (value) => {
      return new Promise((resolve) => {
        setState(value);
        setState((current) => {
          resolve(current);
          return current;
        });
      });
    };

    return [state, asyncSetState];
  };
  const route = useRouter();
  const [stars, setStars] = useState("0");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [data, setData] = useAsyncState({
    pfImg: "",
    displayName: "",
    caption: "",
    body: "",
    owner_email: "",
    stars: "0",
    createdAt: 0,
    img: "",
    comments: [],
    likes: [],
    category: "",
  });
  const [post_onwer, setPost_owner] = useState({
    displayName: "",
    pfImg: "",
    owner_email: "",
  });
  const [likeBtnLoading, setLikeBtnLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [varyingModal, setVaryingModal] = useState(false);
  const [profileImage, setProfileImage] = useState(false);
  const auth = useAuth();
  // const [currentPostId, setCurrentPostId] = useState(
  //   article.doc.key.path.segments[article.doc.key.path.segments.length - 1]
  // );
  const [owner, setOwner] = useState("");

  /* --------------------------------- delete --------------------------------- */
  // const handleDelete = () => {
  //   setBtnLoading(true);
  //   FirestoreService.deleteReview(currentPostId)
  //     .then(() => {
  //       setBtnLoading(false);

  //       window.location.reload(false);
  //     })
  //     .catch((e) => {
  //       alert("Error occured: " + e.message);
  //     });
  // };

  /* ------------------------------- open modal ------------------------------- */
  // const handleModal = () => {
  //   setOpenModal(!openModal);
  //   setVaryingModal(!varyingModal);
  // };

  /* ----------------------------- handleComments ----------------------------- */
  const handleComments = () => {
    console.log(route.pathname);
    if (route.pathname === "/posts/[id]") {
    } else {
      console.log("it called");
      setShowComments(!showComments);
      const post_id = article.doc.key.path.segments[6];
      route.push(`/posts/${post_id}`);
    }
  };

  const handleHeader = () => {
    const post_email =
      article.doc.data.value.mapValue.fields.owner_email.stringValue;
    console.log(post_email);
    if (post_email === auth.user.email) {
      route.push("/profile");
    } else {
      route.push(`/profiles/${post_email}`);
    }
  };

  /* ------------------------------- handleLikes ------------------------------ */
  const handleLikes = async () => {
    if (route.pathname === "/posts/[id]") {
      setLikeBtnLoading(true);
      const id = route.query;

      if (liked) {
        await FirestoreServiceForPosts.RemoveLikes(id.id, auth.user.email).then(
          (response) => {
            console.log("***LIKED REMOVED***");
            setLiked(false);
            route.reload("/posts/[id]");
            setLikeBtnLoading(false);
          }
        );
      } else {
        await FirestoreServiceForPosts.AddLikes(id.id, auth.user.email).then(
          (response) => {
            console.log("***LIKED LIKES***");
            setLiked(true);
            route.reload("/posts/[id]");
            setLikeBtnLoading(false);
          }
        );
      }
    } else {
      const post_id = article.doc.key.path.segments[6];
      route.push(`/posts/${post_id}`);
      // let id = article.doc.key.path.segments[6];
      // if (liked) {
      //   await FirestoreServiceForPosts.RemoveLikes(id, auth.user.email).then(
      //     (response) => {
      //       console.log("***LIKED REMOVED***");
      //       setLiked(false);
      //       route.reload("/posts");
      //     }
      //   );
      // } else {
      //   await FirestoreServiceForPosts.AddLikes(id, auth.user.email).then(
      //     (response) => {
      //       console.log("***LIKED LIKES***");
      //       setLiked(true);
      //       route.reload("/posts");
      //     }
      //   );
      // }
    }
  };
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const id = route.query;
      //const id = article.doc.data.value.mapValue.fields.id.stringValue;
      /* ------------------------------ single post ----------------------------- */
      if (route.pathname === "/posts/[id]") {
        await FirestoreServiceForPosts.getSinglePost(id.id).then((response) => {
          console.log(
            response._delegate._document.data.value.mapValue.fields.pfImg
              .stringValue
          );
          console.log(
            //   Object.entries(
            response._delegate._document.data.value.mapValue.fields
            //   ).length
          );

          /* --------------------------------- 0 LIKES -------------------------------- */
          console.log("<<<< 0 likes >>>>");
          if (
            typeof response._delegate._document.data.value.mapValue.fields.likes
              .arrayValue.values == "undefined"
          ) {
            console.log("likes 0");
            /* ----------------------- <<<<<<<<<<<<<<< 0 COMMENTS ----------------------- */

            if (
              typeof response._delegate._document.data.value.mapValue.fields
                .comments.arrayValue.values == "undefined"
            ) {
              console.log("comments 0");
              setData({
                ...data,
                pfImg:
                  response._delegate._document.data.value.mapValue.fields.pfImg
                    .stringValue,
                owner_email:
                  response._delegate._document.data.value.mapValue.fields
                    .owner_email.stringValue,
                body: response._delegate._document.data.value.mapValue.fields
                  .body.stringValue,

                displayName:
                  response._delegate._document.data.value.mapValue.fields
                    .displayName.stringValue,
                img: response._delegate._document.data.value.mapValue.fields.img
                  .stringValue,
                category:
                  response._delegate._document.data.value.mapValue.fields
                    .category.stringValue,
              });
            } else {
              setData({
                ...data,
                pfImg:
                  response._delegate._document.data.value.mapValue.fields.pfImg
                    .stringValue,
                owner_email:
                  response._delegate._document.data.value.mapValue.fields
                    .owner_email.stringValue,
                body: response._delegate._document.data.value.mapValue.fields
                  .body.stringValue,

                displayName:
                  response._delegate._document.data.value.mapValue.fields
                    .displayName.stringValue,
                img: response._delegate._document.data.value.mapValue.fields.img
                  .stringValue,
                category:
                  response._delegate._document.data.value.mapValue.fields
                    .category.stringValue,

                comments: Object.entries(
                  response._delegate._document.data.value.mapValue.fields
                    .comments.arrayValue.values
                ),
              });
            }
            /* ---------------------- 0 COMMENTS >>>>>>>>>>>>>>>>> ---------------------- */
          } else {
            /* ----------------------- <<<<<<<<<<<<<<< 0 COMMENTS ----------------------- */

            if (
              typeof response._delegate._document.data.value.mapValue.fields
                .comments.arrayValue.values == "undefined"
            ) {
              console.log("it is object");
              setData({
                ...data,
                pfImg:
                  response._delegate._document.data.value.mapValue.fields.pfImg
                    .stringValue,
                owner_email:
                  response._delegate._document.data.value.mapValue.fields
                    .owner_email.stringValue,
                body: response._delegate._document.data.value.mapValue.fields
                  .body.stringValue,

                displayName:
                  response._delegate._document.data.value.mapValue.fields
                    .displayName.stringValue,
                img: response._delegate._document.data.value.mapValue.fields.img
                  .stringValue,
                category:
                  response._delegate._document.data.value.mapValue.fields
                    .category.stringValue,

                likes: Object.entries(
                  response._delegate._document.data.value.mapValue.fields.likes
                    .arrayValue.values
                ),
              });
            } else {
              setData({
                ...data,
                pfImg:
                  response._delegate._document.data.value.mapValue.fields.pfImg
                    .stringValue,
                owner_email:
                  response._delegate._document.data.value.mapValue.fields
                    .owner_email.stringValue,
                body: response._delegate._document.data.value.mapValue.fields
                  .body.stringValue,

                displayName:
                  response._delegate._document.data.value.mapValue.fields
                    .displayName.stringValue,
                img: response._delegate._document.data.value.mapValue.fields.img
                  .stringValue,
                category:
                  response._delegate._document.data.value.mapValue.fields
                    .category.stringValue,

                comments: Object.entries(
                  response._delegate._document.data.value.mapValue.fields
                    .comments.arrayValue.values
                ),
                likes: Object.entries(
                  response._delegate._document.data.value.mapValue.fields.likes
                    .arrayValue.values
                ),
              });
            }
            /* ---------------------- 0 COMMENTS >>>>>>>>>>>>>>>>> ---------------------- */
            /* --------------------<<<<<<<<<<<CHECK IF THE USER LIKE THIS POST ------------------- */
            for (
              var i = 0;
              i <
              Object.entries(
                response._delegate._document.data.value.mapValue.fields.likes
                  .arrayValue.values
              ).length;
              i++
            ) {
              if (
                response._delegate._document.data.value.mapValue.fields.likes
                  .arrayValue.values[i].stringValue == auth.user.email
              ) {
                console.log("INCLUDES ...");
                setLiked(true);
              }
            }
            /* ---------------------- USER LIKE THIS POST ? >>>>>>> --------------------- */
          }
          /* ----------------------------- END OF O LIKES ----------------------------- */
        });
      } else {
        /* ------------------------------- post Array ------------------------------- */
        if (
          typeof article.doc.data.value.mapValue.fields.likes.arrayValue
            .values === "undefined"
        ) {
          //like 0
          if (
            typeof article.doc.data.value.mapValue.fields.comments.arrayValue
              .values === "undefined"
          ) {
            //comments 0
            setData({
              ...data,
              pfImg: article.doc.data.value.mapValue.fields.pfImg.stringValue,
              owner_email:
                article.doc.data.value.mapValue.fields.owner_email.stringValue,
              body: article.doc.data.value.mapValue.fields.body.stringValue,

              displayName:
                article.doc.data.value.mapValue.fields.displayName.stringValue,
              img: article.doc.data.value.mapValue.fields.img.stringValue,
              category:
                article.doc.data.value.mapValue.fields.category.stringValue,
            });
          } else {
            //comments 1
            setData({
              ...data,
              pfImg: article.doc.data.value.mapValue.fields.pfImg.stringValue,
              owner_email:
                article.doc.data.value.mapValue.fields.owner_email.stringValue,
              body: article.doc.data.value.mapValue.fields.body.stringValue,
              comments: Object.entries(
                article.doc.data.value.mapValue.fields.comments.arrayValue
                  .values
              ),

              displayName:
                article.doc.data.value.mapValue.fields.displayName.stringValue,
              img: article.doc.data.value.mapValue.fields.img.stringValue,
              category:
                article.doc.data.value.mapValue.fields.category.stringValue,
            });
          }
        } else {
          //likes 1
          if (
            typeof article.doc.data.value.mapValue.fields.comments.arrayValue
              .values === "undefined"
          ) {
            setData({
              ...data,
              pfImg: article.doc.data.value.mapValue.fields.pfImg.stringValue,
              owner_email:
                article.doc.data.value.mapValue.fields.owner_email.stringValue,
              body: article.doc.data.value.mapValue.fields.body.stringValue,

              likes: Object.entries(
                article.doc.data.value.mapValue.fields.likes.arrayValue.values
              ),
              displayName:
                article.doc.data.value.mapValue.fields.displayName.stringValue,
              img: article.doc.data.value.mapValue.fields.img.stringValue,
              category:
                article.doc.data.value.mapValue.fields.category.stringValue,
            });
            /* --------------------<<<<<<<<<<<CHECK IF THE USER LIKE THIS POST ------------------- */
            //console.log(article.doc.data.value.mapValue.fields.img.stringValue);
            if (
              typeof article.doc.data.value.mapValue.fields.likes.arrayValue
                .values === "undefined"
            ) {
              //do nothing
            } else {
              for (
                var i = 0;
                i <
                Object.entries(
                  article.doc.data.value.mapValue.fields.likes.arrayValue.values
                ).length;
                i++
              ) {
                if (
                  article.doc.data.value.mapValue.fields.likes.arrayValue
                    .values[i].stringValue == auth.user.email
                ) {
                  console.log("INCLUDES ...");
                  setLiked(true);
                }
              }
            }

            /* ---------------------- USER LIKE THIS POST ? >>>>>>> --------------------- */
            //comments 0
          } else {
            //comments 1
            setData({
              ...data,
              pfImg: article.doc.data.value.mapValue.fields.pfImg.stringValue,
              owner_email:
                article.doc.data.value.mapValue.fields.owner_email.stringValue,
              body: article.doc.data.value.mapValue.fields.body.stringValue,
              comments: Object.entries(
                article.doc.data.value.mapValue.fields.comments.arrayValue
                  .values
              ),
              likes: Object.entries(
                article.doc.data.value.mapValue.fields.likes.arrayValue.values
              ),
              displayName:
                article.doc.data.value.mapValue.fields.displayName.stringValue,
              img: article.doc.data.value.mapValue.fields.img.stringValue,
              category:
                article.doc.data.value.mapValue.fields.category.stringValue,
            });
            /* --------------------<<<<<<<<<<<CHECK IF THE USER LIKE THIS POST ------------------- */
            console.log(
              article.doc.data.value.mapValue.fields.likes.arrayValue.values
            );
            if (
              typeof article.doc.data.value.mapValue.fields.likes.arrayValue
                .values === "undefined"
            ) {
              //do nothing
            } else {
              for (
                var i = 0;
                i <
                Object.entries(
                  article.doc.data.value.mapValue.fields.likes.arrayValue.values
                ).length;
                i++
              ) {
                if (
                  article.doc.data.value.mapValue.fields.likes.arrayValue
                    .values[i].stringValue == auth.user.email
                ) {
                  console.log("INCLUDES ...");
                  setLiked(true);
                }
              }
            }

            /* ---------------------- USER LIKE THIS POST ? >>>>>>> --------------------- */
          }
        }
      }
    };
    getData().then(() => {
      setLoading(false);
    });
  }, []);

  /* ---------------------------- get profild data ---------------------------- */
  useEffect(() => {
    console.log(data.owner_email);
    const getPostOwnerInfo = async () => {
      try {
        await FirestoreService.getProfileInfo(data.owner_email).then(
          (response) => {
            console.log(
              response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
                .fields
            );
            setPost_owner({
              ...post_onwer,
              displayName:
                response._delegate._snapshot.docChanges[0].doc.data.value
                  .mapValue.fields.displayName.stringValue,
              pfImg:
                response._delegate._snapshot.docChanges[0].doc.data.value
                  .mapValue.fields.img.stringValue,
            });
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    getPostOwnerInfo();
  }, [data]);

  useEffect(() => {
    console.log(data.likes);
  }, [data]);

  return (
    <>
      <MDBCard
        alignment="card border  shadow mb-3 mt-2"
        className="w-100 shadow rounded "
      >
        <MDBCardHeader
          style={{ backgroundColor: "#684d9d" }}
          onClick={handleHeader}
        >
          <div
            className="d-flex align-items-center"
            // href={{
            //   pathname:
            //     data.owner_email == auth.user.email
            //       ? "/profile"
            //       : "/unknown_profile",
            //   query: {
            //     data: data.owner_email,
            //   },
            // }}
            style={{ textDecoration: "none", color: "black" }}
          >
            <img
              src={
                post_onwer.pfImg
                  ? post_onwer.pfImg
                  : "https://freesvg.org/img/abstract-user-flat-4.png"
              }
              alt=""
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "10px",
              }}
            />
            <div className="d-flex flex-column ">
              {post_onwer.displayName === "" ? (
                <>
                  <p className="placeholder-glow ">
                    <span
                      className="placeholder"
                      style={{ width: "100%" }}
                    ></span>
                  </p>
                </>
              ) : (
                <>
                  <h4 className="mt-3 text-light">{post_onwer.displayName}</h4>
                </>
              )}

              {data.owner_email === "" ? (
                <>
                  <p className="placeholder-glow ">
                    <span
                      className="placeholder"
                      style={{ width: "100%" }}
                    ></span>
                  </p>
                </>
              ) : (
                <>
                  <p className="text-light">{data.owner_email}</p>
                </>
              )}
            </div>
          </div>
        </MDBCardHeader>
        <MDBCardBody>
          {data.body === "" ? (
            <>
              <p className="placeholder-glow ">
                <span className="placeholder" style={{ width: "100%" }}></span>
              </p>
              <p className="placeholder-glow ">
                <span className="placeholder" style={{ width: "100%" }}></span>
              </p>
            </>
          ) : (
            <>
              <p>{data.body}</p>
            </>
          )}

          {data.category === "" ? (
            <>
              <p className="placeholder-glow ">
                <span className="placeholder" style={{ width: "100%" }}></span>
              </p>
            </>
          ) : (
            <>
              <p>#{data.category}</p>
            </>
          )}

          {data.img !== "" && (
            <div className="d-flex w-100 align-items-center justify-content-center">
              <img
                src={data.img}
                alt=""
                style={{
                  width: "300px",
                  height: "300px",

                  objectFit: "contain",
                }}
              />
            </div>
          )}
        </MDBCardBody>
        <MDBCardFooter>
          {/* {mode == "edit" && parent_email == auth.user.email && (
            <>
              <div className="d-flex justify-content-md-end ">
                <Button
                  className="m-1"
                  variant="primary"
                  onClick={async () => {
                    setCurrentPostId(
                      article.doc.key.path.segments[
                        article.doc.key.path.segments.length - 1
                      ]
                    );
                    await setData({
                      id: article.doc.key.path.segments[
                        article.doc.key.path.segments.length - 1
                      ],

                      body: article.doc.data.value.mapValue.fields.body
                        .stringValue,
                      stars:
                        article.doc.data.value.mapValue.fields.stars
                          .stringValue,
                      owner_email: auth.user.email,
                    });

                    handleModal();
                  }}
                >
                  ✎ Edit
                </Button>
                <Button
                  className="m-1"
                  variant="danger"
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  {btnLoading ? (
                    <>
                      <MDBSpinner
                        size="sm"
                        role="status"
                        tag="span"
                        className="me-2"
                      />
                      Loading...
                    </>
                  ) : (
                    <>x Delete</>
                  )}
                </Button>
              </div>
            </>
          )} */}
          {mode == "add" && (
            <>
              <div className="d-flex w-100">
                <div
                  className="d-flex align-items-center justify-content-center w-50 h-100"
                  style={{ cursor: "pointer" }}
                  onClick={handleLikes}
                >
                  {likeBtnLoading ? (
                    <>
                      <HourglassBottomIcon
                        sx={{ fontSize: 40 }}
                        style={{ color: "red" }}
                      />
                      <h6
                        style={{
                          fontWeight: "",
                          paddingLeft: "10px",
                          color: "red",
                        }}
                      >
                        Loading...
                      </h6>
                    </>
                  ) : (
                    <>
                      {liked ? (
                        <>
                          <FavoriteIcon
                            sx={{ fontSize: 40 }}
                            style={{ color: "red" }}
                          />
                        </>
                      ) : (
                        <>
                          {" "}
                          <FavoriteBorderIcon
                            sx={{ fontSize: 40 }}
                            style={{ color: "red" }}
                          />
                        </>
                      )}

                      <h6
                        style={{
                          fontWeight: "",
                          paddingLeft: "10px",
                          color: "red",
                        }}
                      >
                        {/* {
                      article.doc.data.value.mapValue.fields.like.arrayValue
                        .values.length
                    } */}
                        {data.likes.length}
                        {"  "} Likes
                      </h6>
                    </>
                  )}
                </div>

                <div
                  className="d-flex w-50 align-items-center justify-content-center "
                  onClick={handleComments}
                  style={{ cursor: "pointer" }}
                >
                  <ChatBubbleOutlineIcon sx={{ fontSize: 40 }} />
                  <h6 style={{ fontWeight: "", paddingLeft: "10px" }}>
                    {data.comments.length}
                    {"  "}
                    Comments
                  </h6>
                </div>
              </div>
            </>
          )}
        </MDBCardFooter>
      </MDBCard>
      {/* {showComments && (
        <>
          <CommentsArray
            commentsArray={
              article.doc.data.value.mapValue.fields.comments.arrayValue.values
            }
          />
        </>
      )} */}
    </>
  );
}
