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
const CreatePost = ({
  varyingModal,
  handleModal,
  mode,
  dataForEdit,
  currentPostIdForEdit,
}) => {
  const route = useRouter();
  const auth = useAuth();
  const [data, setData] = useState({
    caption: "",
    body: "",
    owner_email: "",
    stars: "0",
    createdAt: 0,
  });
  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState("0");
  const [editbtnLoading, setEditBtnLoading] = useState(false);
  const [profileName, setProfileName] = useState("");
  /* ---------------------------------- edit ---------------------------------- */
  const handleEdit = async (e) => {
    console.log("data.body : " + data.body);
    FirestoreService.updatePost(
      currentPostIdForEdit,
      data.caption,
      data.body,
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
    await FirestoreService.addNewPost(data).then(() => {
      setEditBtnLoading(false);
      handleModal();
    });
    route.reload("/profile");
  };

  /* -------------------------------- useeffect ------------------------------- */
  useEffect(() => {
    setData({ ...data, owner_email: auth.user.email });

    if (mode == "edit") {
      setData({
        ...data,
        body: dataForEdit.body,
      });
    }
  }, [loading]);
  return (
    <div>
      <MDBModal staticBackdrop show={varyingModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create a Review</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <form>
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
              <Button color="secondary" onClick={() => handleModal()}>
                Close
              </Button>
              <Button
                onClick={() => {
                  setEditBtnLoading(true);
                  if (mode == "add") {
                    handlePost();
                  } else if (mode == "edit") {
                    setEditBtnLoading(true);
                    console.log(data);
                    handleEdit();
                  }
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
    </div>
  );
};

export default CreatePost;
