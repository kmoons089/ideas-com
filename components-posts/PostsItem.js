import Link from "next/link";
import articleStyles from "../styles2/Article.module.css";

// const ArticleItem = ({ article }) => {
//   return (
//     <div>
//       <a className={articleStyles.card}>
//         <h3>|{article.doc.data.value.mapValue.fields.caption.stringValue}|</h3>
//       </a>
//     </div>
//   );
// };

// export default ArticleItem;
import React, { useEffect, useState } from "react";
import { Loader } from "./Loader";
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

export default function ArticleItem({ article, mode, props }) {
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

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [editbtnLoading, setEditBtnLoading] = useState(false);
  const [data, setData] = useAsyncState({
    caption: "",
    body: "",
    owner_email: "",
    stars: "0",
    createdAt: 0,
  });
  let date = new Date();

  const [varyingModal, setVaryingModal] = useState(false);
  const auth = useAuth();
  const [currentPostId, setCurrentPostId] = useState(
    article.doc.key.path.segments[article.doc.key.path.segments.length - 1]
  );
  // const [currentPost, setCurrentPost] = useState({
  //   caption: article.doc.data.value.mapValue.fields.caption.stringValue,
  //   body: article.doc.data.value.mapValue.fields.body.stringValue,
  //   stars: article.doc.data.value.mapValue.fields.stars.stringValue,
  // });
  // const [edit, setEdit] = useState(false);

  /* ---------------------------------- edit ---------------------------------- */
  const handleEdit = (e) => {
    console.log(data.stars);
    FirestoreService.updatePost(
      currentPostId,
      data.caption,
      data.body,
      data.owner_email,
      data.stars
    )
      .then(() => {
        window.location.reload(false);
        setCurrentPostId("");
        setData({ caption: "", body: "", stars: "0" });
        setEditBtnLoading(false);
        handleModal();
      })
      .catch((e) => {
        console.log("Error occured: " + e.message);
      });
  };

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

  /* -------------------------------- useEffect ------------------------------- */
  // useEffect(async () => {
  //   // const date = new Date();
  //   // const seconds = Math.floor(date.getTime() / 1000);
  //   // setData(currentPost);
  //   // setData({ ...data, createdAt: seconds, owner_email: auth.user.email });
  // }, []);
  return (
    <>
      {openModal && !loading && (
        <>
          <MDBModal
            staticBackdrop
            show={varyingModal}
            setShow={setVaryingModal}
            tabIndex="-1"
          >
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Create a Review</MDBModalTitle>
                </MDBModalHeader>
                <MDBModalBody>
                  <form>
                    <div className="mb-3">
                      <MDBInput
                        labelClass="col-form-label"
                        label="Caption :"
                        required
                        onChange={(e) =>
                          setData({
                            ...data,
                            caption: e.target.value,
                          })
                        }
                        value={data.caption}
                      />
                    </div>
                    <div className="mb-3">
                      <MDBTextArea
                        labelClass="col-form-label"
                        label="Message :"
                        required
                        onChange={(e) =>
                          setData({
                            ...data,
                            body: e.target.value,
                          })
                        }
                        value={data.body}
                      />
                    </div>
                    <div className="mb-3">
                      <MDBInput
                        labelClass="col-form-label"
                        label="Stars :"
                        required
                        onChange={(e) =>
                          setData({
                            ...data,
                            stars: e.target.value,
                          })
                        }
                        value={data.stars}
                      />
                    </div>
                  </form>
                </MDBModalBody>
                <MDBModalFooter>
                  <Button color="secondary" onClick={handleModal}>
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setEditBtnLoading(true);
                      console.log(data);
                      handleEdit();
                    }}
                  >
                    {editbtnLoading ? (
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
                      <>POST</>
                    )}
                  </Button>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </>
      )}
      <Container className="d-flex flex-column align-items-center justify-content-center w-100 mt-3 ">
        <Container>
          {mode == "edit" && (
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
                      caption:
                        article.doc.data.value.mapValue.fields.caption
                          .stringValue,
                      body: article.doc.data.value.mapValue.fields.body
                        .stringValue,
                      stars:
                        article.doc.data.value.mapValue.fields.stars
                          .stringValue,
                      owner_email: auth.user.email,
                    });
                    console.log(data);
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
        </Container>
        <MDBCard
          alignment="card border border-warning shadow-0 mb-3"
          className="w-100 shadow-sm  rounded"
        >
          <MDBCardHeader>
            {" "}
            Posted by -
            {article.doc.data.value.mapValue.fields.owner_email.stringValue}
          </MDBCardHeader>
          <MDBCardBody>
            <MDBCardTitle>
              {" "}
              {article.doc.data.value.mapValue.fields.caption.stringValue}
            </MDBCardTitle>
            <MDBCardText>
              {" "}
              Rating Stars -
              {article.doc.data.value.mapValue.fields.stars.stringValue}
            </MDBCardText>
            <MDBCardText>
              <small>
                {article.doc.data.value.mapValue.fields.body.stringValue}
              </small>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </Container>
    </>
  );
}
