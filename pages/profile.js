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
import ProfileEditModal from "../components-posts/ProfileEditModal";

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
  const [profileInfo, setProfileInfo] = useState({
    displayName: "",
    bio: "",
    img: "",
    owner_email: "",
  });
  const [varyingModal, setVaryingModal] = useState(false);
  const auth = useAuth();
  const [profileName, setProfileName] = useState("");
  const [profileId, setProfileId] = useState("");
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [varyingModal_forProfile, setVaryingModal_forProfile] = useState(false);

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
  /* ------------------------- handleProfileEditModal ------------------------- */
  const handleProfileEditModal = () => {
    setShowProfileEditModal(!showProfileEditModal);
    setVaryingModal_forProfile(!varyingModal_forProfile);
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
      setProfileId(
        response._delegate._snapshot.docChanges[0].doc.key.path.segments[
          response._delegate._snapshot.docChanges[0].doc.key.path.segments
            .length - 1
        ]
      );
      setProfileInfo((prev) => ({
        ...prev,
        displayName:
          response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
            .fields.displayName.stringValue,
        bio: response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
          .fields.bio.stringValue,
        img: response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
          .fields.img.stringValue,
      }));
    });
  }, []);

  return (
    <>
      {showProfileEditModal && (
        <>
          <ProfileEditModal
            varyingModal_forProfile={varyingModal_forProfile}
            setVaryingModal_forProfile={setVaryingModal_forProfile}
            handleProfileEditModal={handleProfileEditModal}
            profileId={profileId}
            profileInfo={profileInfo}
          />
        </>
      )}
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
                  <div className="card-header  bg-dark text-white w-100 text-center">
                    <h5> Profile Card</h5>
                  </div>

                  <div className="card-body d-flex align-items-center flex-column text-center ">
                    <img
                      className="bd-placeholder-img rounded-circle mt-3"
                      src={
                        profileInfo.img
                          ? profileInfo.img
                          : "https://freesvg.org/img/abstract-user-flat-4.png"
                      }
                      alt=""
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />

                    <h2 className="text-center">{profileInfo.displayName}</h2>
                    <p className="text-muted">{auth.user.email}</p>
                    <p>{profileInfo.bio}</p>
                  </div>

                  <div className="card-footer w-100 d-flex justify-content-end">
                    <Button
                      className="  m-1"
                      style={{ zIndex: "2" }}
                      onClick={handleModal}
                    >
                      Create Post
                    </Button>
                    <Button
                      className="  m-1"
                      style={{ zIndex: "2" }}
                      onClick={handleProfileEditModal}
                    >
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-sm-8 d-flex align-items-center ">
                <PostsList mode="edit" parent_email={auth.user.email} />
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default profile;
