import React, { useEffect, useState } from "react";
import PostsList from "../components-posts/PostsList";
import { Button, Container } from "react-bootstrap";
import { Loader } from "../components/Loader";
import Image from "next/image";
import pfImage from "../public/img/profileImage.png";
import { db } from "../utils/firestore";
import { useAuth } from "../context/AuthContext";
import CreatePost from "../components/CreatePost";
import { useRouter } from "next/router";
import FirestoreService from "../utils/FirestoreService";

const profile = () => {
  const route = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    caption: "",
    body: "",
    owner_email: "",
    stars: "0",
    createdAt: 0,
  });
  const [varyingModal, setVaryingModal] = useState(false);
  const auth = useAuth();
  const [profileName, setProfileName] = useState("");

  /* ------------------------- for rating stars review ------------------------ */
  function onValueChange(e) {
    setStars(e.target.value);
    setData({
      ...data,
      stars: e.target.value,
    });
    console.log(e.target.value);
  }

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
    FirestoreService.getProfileInfo(auth.user.email).then((response) => {
      setProfileName(
        response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
          .fields.displayName.stringValue
      );
    });
  }, []);

  return (
    <>
      {openModal && !loading && (
        <>
          <CreatePost
            varyingModal={varyingModal}
            handleModal={handleModal}
            mode="add"
            currentPostIdForEdit=""
          />
        </>
      )}
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
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
            <div className="row w-100 ">
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

                    <h2 className="text-center">{profileName}</h2>
                    <p>{auth.user.email}</p>
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
