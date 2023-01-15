import Meta from "../components/Meta";
import React, { useEffect, useState } from "react";

import PostsList from "../components-posts/PostsList";
import { Button } from "react-bootstrap";
import { Loader } from "../components/Loader";
import bg from "../public/img/reviewBg.svg";
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
import { db } from "../utils/firestore";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

const review = () => {
  const { user } = useAuth();
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
          <Meta title="Login" />
          <div
            style={{
              width: "100%",
              minHeight: "100vh",
              position: "fixed",
              top: "0",
              zIndex: -3,
            }}
          ></div>
          <Button
            style={{ zIndex: "2" }}
            className="position-fixed bottom-0 end-0 m-5 btn-lg"
            onClick={handleModal}
          >
            Create Post
          </Button>
          <PostsList mode="add" />
        </>
      )}
    </>
  );
};

export default review;
