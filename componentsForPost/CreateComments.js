import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { db, storage } from "../utils/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTextArea,
  MDBInput,
  MDBSpinner,
} from "mdb-react-ui-kit";
import FirestoreServiceForPosts from "../utils/FirestoreServiceForPosts";
import FirestoreService from "../utils/FirestoreService";
import { useRouter } from "next/router";

const CreateComments = () => {
  const route = useRouter();
  const id = route.query;
  const auth = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [varyingModal, setVaryingModal] = useState(true);
  const [saveChangesBtn, setSaveChangesBtn] = useState(false);
  const [data, setData] = useState({
    pfImg: "",
    displayName: "",
    owner_email: "",
    body: "",
  });
  const [inputError, setInputError] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const addComment = async () => {
    setSaveChangesBtn(true);
    const postId = id.id;
    if (data.body == "") {
      setInputError(true);
      setSaveChangesBtn(false);
      return;
    } else {
      await FirestoreServiceForPosts.createComment(postId, data).then(
        (response) => {
          console.log(response);

          route.reload("/posts/[id]");
          setSaveChangesBtn(false);
        }
      );
    }
  };

  useEffect(() => {
    setData({ ...data, owner_email: auth.user.email });
    const getData = async () => {
      await FirestoreService.getProfileInfo(auth.user.email).then(
        (response) => {
          setData({
            ...data,
            displayName:
              response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
                .fields.displayName.stringValue,
            owner_email:
              response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
                .fields.owner_email.stringValue,
            pfImg:
              response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
                .fields.img.stringValue,
          });
        }
      );
    };
    getData();
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="d-flex w-100 align-items-center justify-content-center">
      {showModal ? (
        <>
          <MDBModal
            staticBackdrop
            show={varyingModal}
            setShow={setVaryingModal}
            tabIndex="-1"
            // style={{
            //   position: "fixed",
            //   top: "50px",
            //   zIndex: "4",
            // }}
          >
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Create Comment</MDBModalTitle>
                </MDBModalHeader>
                <MDBModalBody>
                  <form>
                    <div className="mb-3">
                      {inputError && (
                        <>
                          <p className="text-danger">Please add something</p>
                        </>
                      )}

                      <label htmlFor="formFile" className="form-label">
                        Caption :
                      </label>
                      <MDBInput
                        labelClass="col-form-label"
                        required
                        value={data.body || ""}
                        onChange={(e) => {
                          setData({ ...data, body: e.target.value });
                        }}
                      />
                    </div>
                  </form>
                </MDBModalBody>
                <MDBModalFooter>
                  <div
                    className="btn"
                    style={{
                      backgroundColor: "white",
                      border: "1px #6741b3 solid",
                      color: "#6741b3",
                    }}
                    color="secondary"
                    onClick={handleModal}
                  >
                    Close
                  </div>
                  <div
                    className="btn"
                    style={{
                      backgroundColor: "#6741b3",
                      border: "none",
                      color: "white",
                    }}
                    onClick={addComment}
                  >
                    {saveChangesBtn ? (
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
                      <>Upload Comment</>
                    )}
                  </div>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </>
      ) : (
        <>
          <div
            onClick={handleModal}
            className="d-flex w-100"
            style={{ cursor: "pointer" }}
          >
            <div className="input-group m-2 ">
              <input
                type="text"
                className="form-control"
                placeholder="What's on your mind"
              />
              <span className="input-group-text" id="basic-addon2">
                Create Comment
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateComments;
