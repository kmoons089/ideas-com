import React, { useState, useEffect } from "react";
import {
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
import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import FirestoreService from "../utils/FirestoreService";

/* ------------------------------- create post ------------------------------ */
const CreateReview = () => {
  const route = useRouter();
  const auth = useAuth();
  const [data, setData] = useState({
    review: "",
    owner_email: "",
    stars: "0",
  });
  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState("0");
  const [editbtnLoading, setEditBtnLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [varyingModal, setVaryingModal] = useState(true);

  const handleModal = () => {
    setShowModal(!showModal);
  };
  /* ---------------------------------- edit ---------------------------------- */
  const handleEdit = async (e) => {
    console.log("data.body : " + data.body);
    FirestoreService.updateReview(
      currentPostIdForEdit,
      data.review,
      auth.user.email,
      data.stars
    )
      .then(() => {
        setData({ caption: "", body: "", stars: "0" });
        setEditBtnLoading(false);
        handleModal();
        route.reload("/profile");
      })
      .catch((e) => {
        console.log("Error occured: " + e.message);
      });
  };

  /* ------------------------------ onValueChange ----------------------------- */
  function onValueChange(e) {
    setStars(e.target.value);
    setData({
      ...data,
      stars: e.target.value,
    });
    console.log(e.target.value);
  }
  /* ------------------------------- handlePost ------------------------------- */
  const handlePost = async () => {
    console.log(data);
    await FirestoreService.addNewReview(data).then(() => {
      setEditBtnLoading(false);
      handleModal();
    });
    route.reload("/profile");
  };

  /* -------------------------------- useeffect ------------------------------- */
  // useEffect(() => {
  //   setData({ ...data, owner_email: auth.user.email });

  //   if (mode == "edit") {
  //     setData({
  //       ...data,
  //       body: dataForEdit.body,
  //     });
  //   }
  // }, [loading]);
  useEffect(() => {
    setData({
      ...data,
      owner_email: auth.user.email,
    });
  }, []);
  return (
    <div style={{ zIndex: "2" }}>
      {showModal ? (
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
                      <p>review : </p>
                      <MDBTextArea
                        labelClass="col-form-label"
                        required
                        onChange={(e) =>
                          setData({
                            ...data,
                            review: e.target.value,
                          })
                        }
                        value={data.review}
                      />
                    </div>
                    <div className="mb-3">
                      <div className="container d-flex justify-content-center ">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="stars">
                              <input
                                className="star star-5"
                                id="star-5"
                                type="radio"
                                name="star"
                                value="5"
                                onChange={onValueChange}
                              />

                              <label
                                className="star star-5"
                                htmlFor="star-5"
                              ></label>

                              <input
                                className="star star-4"
                                id="star-4"
                                type="radio"
                                name="star"
                                value="4"
                                onChange={onValueChange}
                              />

                              <label
                                className="star star-4"
                                htmlFor="star-4"
                              ></label>

                              <input
                                className="star star-3"
                                id="star-3"
                                type="radio"
                                name="star"
                                value="3"
                                onChange={onValueChange}
                              />

                              <label
                                className="star star-3"
                                htmlFor="star-3"
                              ></label>

                              <input
                                className="star star-2"
                                id="star-2"
                                type="radio"
                                name="star"
                                value="2"
                                onChange={onValueChange}
                              />

                              <label
                                className="star star-2"
                                htmlFor="star-2"
                              ></label>

                              <input
                                className="star star-1"
                                id="star-1"
                                type="radio"
                                name="star"
                                value="1"
                                onChange={onValueChange}
                              />

                              <label
                                className="star star-1"
                                htmlFor="star-1"
                              ></label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </MDBModalBody>
                <MDBModalFooter>
                  <div
                    className="btn"
                    style={{
                      backgroundColor: "white",
                      color: "#684d9d",
                      border: "1px #684d9d solid",
                    }}
                    onClick={() => handleModal()}
                  >
                    Close
                  </div>
                  <div
                    className="btn"
                    style={{
                      backgroundColor: "#684d9d",
                      color: "white",
                    }}
                    onClick={() => {
                      setEditBtnLoading(true);
                      // if (mode == "add") {
                      handlePost();
                      // } else if (mode == "edit") {
                      //   setEditBtnLoading(true);
                      //   console.log(data);
                      //   handleEdit();
                      // }
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
                      <>Upload Review</>
                    )}
                  </div>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </>
      ) : (
        <>
          <Button
            className="position-fixed bottom-0 end-0 m-5 btn-lg shadow"
            onClick={handleModal}
            style={{
              zIndex: "3",
              backgroundColor: "#ffbb01",
              border: "none",
            }}
          >
            Create Review
          </Button>
        </>
      )}
    </div>
  );
};

export default CreateReview;
