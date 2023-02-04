import React, { useEffect, useState } from "react";
import { Loader } from "./Loader";
import Link from "next/link";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardFooter,
  MDBSpinner,
} from "mdb-react-ui-kit";
import gridStyle from "../styles/Article.module.css";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import FirestoreService from "../utils/FirestoreService";
import CreateReviewForm from "../components/RatingStar_read";
import CreateReview from "../components/CreateReview";
import RatingStar_read from "../components/RatingStar_read";
import { useRouter } from "next/router";

export default function ArticleItem({ article, mode, props, parent_email }) {
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

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const [reviewData, setReviewData] = useState({
    review: "",
    stars: 0,
    owner_email: "",
    id: "",
  });
  const [post_onwer, setPost_owner] = useState({
    displayName: "",
    pfImg: "",
  });

  const [varyingModal, setVaryingModal] = useState(false);
  const auth = useAuth();
  const [currentPostId, setCurrentPostId] = useState(
    article.doc.key.path.segments[article.doc.key.path.segments.length - 1]
  );

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

  /* --------------------------------- delete --------------------------------- */
  const handleDelete = () => {
    setBtnLoading(true);
    FirestoreService.deleteReview(currentPostId)
      .then(() => {
        setBtnLoading(false);

        window.location.reload(false);
      })
      .catch((e) => {
        console.log("Error occured: " + e.message);
      });
  };

  /* ------------------------------- open modal ------------------------------- */
  const handleModal = () => {
    setOpenModal(!openModal);
    setVaryingModal(!varyingModal);
  };

  /* ----------------------------- get reviewData ----------------------------- */
  useEffect(() => {
    const getReviewData = async () => {
      setReviewData({
        ...reviewData,
        review: article.doc.data.value.mapValue.fields.review.stringValue,
        stars: article.doc.data.value.mapValue.fields.stars.stringValue,
        owner_email:
          article.doc.data.value.mapValue.fields.owner_email.stringValue,
      });
    };
    getReviewData();
  }, []);

  /* ---------------------------- get profild data ---------------------------- */
  useEffect(() => {
    let email = reviewData.owner_email;
    const getPostOwnerInfo = async () => {
      try {
        await FirestoreService.getProfileInfo(email).then((response) => {
          setPost_owner({
            ...post_onwer,
            displayName:
              response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
                .fields.displayName.stringValue,
            pfImg:
              response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
                .fields.img.stringValue,
          });
        });
      } catch (error) {
        console.log(error);
      }
    };
    getPostOwnerInfo();
  }, [reviewData]);

  useEffect(() => {}, []);

  return (
    <>
      {/* {openModal && !loading && (
        <>
          <CreateReview
            varyingModal={varyingModal}
            handleModal={handleModal}
            mode="edit"
            dataForEdit={data}
            currentPostIdForEdit={
              article.doc.key.path.segments[
                article.doc.key.path.segments.length - 1
              ]
            }
          />
        </>
      )} */}

      <MDBCard
        alignment="card border  shadow-0 mb-3 mt-2 shadow"
        className={gridStyle.card}
      >
        <MDBCardHeader
          onClick={handleHeader}
          style={{ backgroundColor: "#684d9d" }}
        >
          <div
            // onClick={() => {
            //   if (
            //     article.doc.data.value.mapValue.fields.owner_email
            //       .stringValue == auth.user.email
            //   ) {
            //     route.push("/");
            //   } else {
            //     route.push("/unknown_profile");
            //   }
            // }}
            className="d-flex align-items-center"
            // href={{
            //   pathname:
            //     article.doc.data.value.mapValue.fields.owner_email
            //       .stringValue == auth.user.email
            //       ? "/profile"
            //       : "/unknown_profile",
            //   query: {
            //     data: article.doc.data.value.mapValue.fields.owner_email
            //       .stringValue,
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
                  <p class="placeholder-glow ">
                    <span class="placeholder" style={{ width: "100%" }}></span>
                  </p>
                </>
              ) : (
                <>
                  <h4 className="mt-3 text-light">{post_onwer.displayName}</h4>
                </>
              )}

              {reviewData.owner_email === "" ? (
                <>
                  <p class="placeholder-glow ">
                    <span class="placeholder" style={{ width: "100%" }}></span>
                  </p>
                </>
              ) : (
                <>
                  <p className="text-light">{reviewData.owner_email}</p>
                </>
              )}
            </div>
          </div>
        </MDBCardHeader>
        <MDBCardBody>
          {reviewData.review === "" ? (
            <>
              <p class="placeholder-glow ">
                <span class="placeholder" style={{ width: "100%" }}></span>
              </p>
            </>
          ) : (
            <>
              <p>{reviewData.review}</p>
            </>
          )}

          <RatingStar_read starcount={reviewData.stars} />
        </MDBCardBody>
        {/* <MDBCardFooter>
          {mode == "edit" && parent_email == auth.user.email && (
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
          )}
        </MDBCardFooter> */}
      </MDBCard>
    </>
  );
}
