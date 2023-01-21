import React, { useEffect, useState } from "react";
import { Loader } from "./Loader";
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
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import FirestoreService from "../utils/FirestoreService";
import CreatePostForm from "../components/RatingStar_read";
import CreatePost from "../components/CreatePost";
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
  const [stars, setStars] = useState("0");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [data, setData] = useAsyncState({
    caption: "",
    body: "",
    owner_email: "",
    stars: "0",
    createdAt: 0,
  });

  const [varyingModal, setVaryingModal] = useState(false);
  const [profileImage, setProfileImage] = useState(false);
  const auth = useAuth();
  const [currentPostId, setCurrentPostId] = useState(
    article.doc.key.path.segments[article.doc.key.path.segments.length - 1]
  );
  const [owner, setOwner] = useState("");

  /* --------------------------------- delete --------------------------------- */
  const handleDelete = () => {
    setBtnLoading(true);
    FirestoreService.deletePost(currentPostId)
      .then(() => {
        setBtnLoading(false);

        window.location.reload(false);
      })
      .catch((e) => {
        alert("Error occured: " + e.message);
      });
  };

  /* ------------------------------- open modal ------------------------------- */
  const handleModal = () => {
    setOpenModal(!openModal);
    setVaryingModal(!varyingModal);
  };

  useEffect(() => {
    console.log(
      "owner email : " +
        article.doc.data.value.mapValue.fields.owner_email.stringValue
    );
    setOwner(article.doc.data.value.mapValue.fields.owner_email.stringValue);
    const email =
      article.doc.data.value.mapValue.fields.owner_email.stringValue;
    FirestoreService.getProfileInfo(email).then((response) => {
      console.log(response._delegate._snapshot.docChanges);
      setProfileName(
        response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
          .fields.displayName.stringValue
      );
      if (
        response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
          .fields.img == undefined
      ) {
        setProfileImage("");
      } else {
        setProfileImage(
          response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
            .fields.img.stringValue
        );
      }
    });
  }, []);

  return (
    <>
      {openModal && !loading && (
        <>
          <CreatePost
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
      )}

      <MDBCard
        alignment="card border border-warning shadow-0 mb-3 mt-2"
        className="w-100 shadow-sm  rounded"
      >
        <MDBCardHeader>
          <Link
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
            href={{
              pathname:
                article.doc.data.value.mapValue.fields.owner_email
                  .stringValue == auth.user.email
                  ? "/profile"
                  : "/unknown_profile",
              query: {
                data: article.doc.data.value.mapValue.fields.owner_email
                  .stringValue,
              },
            }}
            style={{ textDecoration: "none", color: "black" }}
          >
            <img
              src={
                profileImage
                  ? profileImage
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
              <h4 className="mt-3">{profileName}</h4>
              <p>
                {article.doc.data.value.mapValue.fields.owner_email.stringValue}
              </p>
            </div>
          </Link>
        </MDBCardHeader>
        <MDBCardBody>
          <MDBCardTitle>
            {article.doc.data.value.mapValue.fields.body.stringValue}
          </MDBCardTitle>

          <RatingStar_read
            starcount={article.doc.data.value.mapValue.fields.stars.stringValue}
          />
        </MDBCardBody>
        <MDBCardFooter>
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
        </MDBCardFooter>
      </MDBCard>
    </>
  );
}
