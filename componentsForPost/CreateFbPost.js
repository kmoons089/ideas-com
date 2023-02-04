import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { db, storage } from "../utils/firestore";
import style from "../styles/Layout.module.css";
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

const CreateFbPost = () => {
  const route = useRouter();
  const auth = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [varyingModal, setVaryingModal] = useState(true);
  const [saveChangesBtn, setSaveChangesBtn] = useState(false);
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    pfImg: "",
    displayName: "",
    owner_email: "",
    body: "",
    img: "",
    likes: [],
    comments: [],
    category: "",
  });
  const [inputError, setInputError] = useState(false);

  const handleModal = () => {
    console.log("handle modal");
    setShowModal(!showModal);
  };

  const AddPost = async () => {
    setSaveChangesBtn(true);
    console.log("add post");
    if (data.body == "" || data.category == "") {
      setInputError(true);
      setSaveChangesBtn(false);
      return;
    }

    if (file == null) {
      console.log("file null");
      let url = "";
      await FirestoreServiceForPosts.addNewPost(data, url).then(() => {
        console.log("Successfully Post added");
        setSaveChangesBtn(false);
        handleModal();
        route.reload();
      });
    } else {
      console.log("img uploading >>>");
      const imageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(imageRef, file).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then(async (url) => {
          setData((prev) => ({
            ...prev,
            img: url,
          }));
          console.log(data);
          console.log(url);
          await FirestoreServiceForPosts.addNewPost(data, url).then(() => {
            console.log("Successfully Post added");
            setSaveChangesBtn(false);
            handleModal();
            route.reload();
          });
        });
      });
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

  useEffect(() => {
    setInputError(false);
  }, [showModal]);

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
                  <MDBModalTitle>Create Post</MDBModalTitle>
                </MDBModalHeader>
                <MDBModalBody>
                  <form>
                    <div className="mb-3">
                      {inputError && (
                        <>
                          <p className="text-danger">
                            Something went wrong. Please fill this field.
                          </p>
                        </>
                      )}
                      <div>
                        <input
                          className="m-2"
                          type="radio"
                          value="html"
                          name="category"
                          onChange={(e) => {
                            setData({ ...data, category: e.target.value });
                          }}
                          checked={data.category == "html"}
                        />
                        Html
                        <input
                          className="m-2"
                          type="radio"
                          value="java"
                          name="category"
                          onChange={(e) => {
                            setData({ ...data, category: e.target.value });
                          }}
                          checked={data.category == "java"}
                        />
                        Java
                        <input
                          className="m-2"
                          type="radio"
                          value="powerpoint"
                          name="category"
                          onChange={(e) => {
                            setData({ ...data, category: e.target.value });
                          }}
                          checked={data.category == "powerpoint"}
                        />
                        PowerPoint
                        <br />
                        <input
                          className="m-2"
                          type="radio"
                          value="hardware"
                          name="category"
                          onChange={(e) => {
                            setData({ ...data, category: e.target.value });
                          }}
                          checked={data.category == "hardware"}
                        />
                        Hardware
                        <input
                          className="m-2"
                          type="radio"
                          value="fun_post"
                          name="category"
                          onChange={(e) => {
                            setData({ ...data, category: e.target.value });
                          }}
                          checked={data.category == "fun_post"}
                        />
                        Fun_Post
                      </div>
                    </div>
                    <div className="mb-3">
                      {inputError && (
                        <>
                          <p className="text-danger">
                            Something went wrong. Please fill this field.
                          </p>
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
                    <div className="mb-3">
                      <label htmlFor="formFile" className="form-label">
                        Image
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        id="formFile"
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                        }}
                        required
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
                    onClick={AddPost}
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
                      <>Upload Post</>
                    )}
                  </div>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
          <div
            onClick={handleModal}
            className="d-flex w-100"
            style={{ cursor: "pointer" }}
          >
            <div className="input-group m-2 rounded ">
              <input
                type="text"
                className="form-control"
                placeholder="What's on your mind"
                style={{ cursor: "pointer" }}
              />
              <span className="input-group-text  " id="basic-addon2">
                Create Post
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            onClick={handleModal}
            className="d-flex w-100"
            style={{ cursor: "pointer" }}
          >
            <div className="input-group m-2 rounded ">
              <input
                type="text"
                className="form-control"
                placeholder="What's on your mind"
                style={{ cursor: "pointer" }}
              />
              <span className="input-group-text  " id="basic-addon2">
                Create Post
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateFbPost;
