import Meta from "../components/Meta";
import React, { useEffect, useState } from "react";

import PostsList from "../components-posts/PostsList";
import { Button, Container } from "react-bootstrap";
import { Loader } from "../components/Loader";
import Image from "next/image";
import pfImage from "../public/img/profileImage.png";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

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
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import { db } from "../utils/firestore";
import { useAuth } from "../context/AuthContext";

const profile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    caption: "",
    body: "",
    owner_email: "",
    stars: "0",
    createdAt: 0,
  });
  let date = new Date();

  const [varyingModal, setVaryingModal] = useState(false);
  const auth = useAuth();
  const [currentPostId, setCurrentId] = useState();
  const [currentPost, setCurrentPost] = useState();

  /* ------------------------------- handleModal ------------------------------ */
  const handleModal = () => {
    setOpenModal(!openModal);
    setVaryingModal(!varyingModal);
  };
  /* ------------------------------- handlePost ------------------------------- */
  const handlePost = async () => {
    setLoading(true);
    console.log(data);
    return new Promise((resolve, reject) => {
      db.collection("posts")
        .add(data)
        .then((docRef) => {
          resolve(docRef);
        })
        .then(() => {
          setLoading(false);
          setOpenModal(!openModal);
          setVaryingModal(!varyingModal);
          setData({ ...data, caption: "", body: "", stars: "0", createdAt: 1 });
        })
        .catch((e) => {
          reject(e);
        });
    });
  };
  /* ---------------------------------- edit ---------------------------------- */

  useEffect(() => {
    console.log(auth.user.email);
    const date = new Date();
    const seconds = Math.floor(date.getTime() / 1000);

    setData({
      ...data,
      owner_email: auth.user.email,
      createdAt: seconds,
    });
  }, [loading]);

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
                      setData({
                        ...data,
                        createdAt: Math.floor(date.getTime() / 1000),
                      });
                      handlePost();
                    }}
                  >
                    Post
                  </Button>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </>
      )}
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {/* <div
            style={{
              backgroundColor: "#e0f8fb",
              width: "100%",
              height: "100vh",
              position: "fixed",
              top: "0",
              zIndex: -3,
            }}
          ></div> */}
          <Meta title="Login" />
          <div
            className="d-flex align-items-start justify-content-center "
            style={{
              minHeight: "100vh",
              width: "100%",
              position: "fixed",
              zIndex: "-1",
            }}
          ></div>
          <Container className="d-flex align-items-start justify-content-center">
            <div className="row w-100 bg-warning">
              <div className="col-sm-4 d-flex align-items-start justify-content-center">
                <div className="card w-100   align-items-center m-1">
                  <div class="card-header  bg-dark text-white w-100 text-center">
                    <h5> Profile Card</h5>
                  </div>
                  <div class="card-body d-flex align-items-center flex-column text-center ">
                    <Image
                      className="bd-placeholder-img rounded-circle mt-3"
                      src={pfImage}
                      alt=""
                      style={{ width: "200px", height: "200px" }}
                    />

                    <h1 className="text-center">{auth.user.email}</h1>
                    <p className="text-muted">
                      Sorry for not avaliable to update customize profile image
                      and other informations.
                    </p>
                  </div>

                  <div class="card-footer w-100 d-flex justify-content-end">
                    <Button
                      className="  m-1"
                      style={{ zIndex: "2" }}
                      onClick={handleModal}
                    >
                      Create Post
                    </Button>
                  </div>
                </div>
              </div>
              <div
                className="col-sm-8 d-flex align-items-center "
                style={{ minHeight: "93vh" }}
              >
                <Container
                  className=" d-flex align-items-start "
                  style={{ minHeight: "93vh", backgroundColor: "white" }}
                >
                  <Container
                    className="d-flex justify-content-center  align-items-center flex-column  w-100 "
                    style={{ backgroundColor: "white" }}
                  >
                    <PostsList mode="edit" />
                  </Container>
                </Container>
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default profile;
