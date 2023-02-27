import React, { useEffect, useState } from "react";
import ReviewArray from "../components-posts/ReviewArray";
import { Button, Container } from "react-bootstrap";
import { Loader } from "../components/Loader";
import Image from "next/image";
import pfImage from "../public/img/profileImage.png";
import { db } from "../utils/firestore";
import { useAuth } from "../context/AuthContext";
import CreateReview from "../components/CreateReview";
import { useRouter } from "next/router";
import FirestoreService from "../utils/FirestoreService";
import ProfileEditModal from "../components-posts/ProfileEditModal";
import PostsArray from "../componentsForPost/PostsArray";
import CreateFbPost from "../componentsForPost/CreateFbPost";
import FirestoreServiceForPosts from "../utils/FirestoreServiceForPosts";
import ChangePassword from "../componentsforpw/ChangePassword";

const profile = () => {
  const route = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [postCount, setPostCount] = useState(0);
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
  /* ----------------------------- change Password ---------------------------- */
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [varyingModal_forPw, setVaryingModal_forPw] = useState(false);
  const handleChangePasswordModal = () => {
    setShowChangePasswordModal(!showChangePasswordModal);
    setVaryingModal_forPw(!varyingModal_forPw);
    console.log("change password modal opened.");
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
    FirestoreServiceForPosts.getProfilePosts(auth.user.email)

      .then((response) => {
        console.log(response._delegate._snapshot.docChanges.length);
        setPostCount(response._delegate._snapshot.docChanges.length);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        console.log("Error occured while fetching profileInfo " + e);
        console.log(e);
      });
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
      {showChangePasswordModal && (
        <>
          <ChangePassword
            varyingModal_forPw={varyingModal_forPw}
            setVaryingModal_forPw={setVaryingModal_forPw}
            handleChangePasswordModal={handleChangePasswordModal}
            profileId={profileId}
            profileInfo={profileInfo}
          />
        </>
      )}
      {openModal && !loading && (
        <>
          <CreateReview
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
                <div
                  // style={{ width: "100%" }}
                  className="card  w-100  align-items-center shadow mt-3 "
                >
                  <div
                    className="card-header   text-white w-100 text-center"
                    style={{ backgroundColor: "#684d9d" }}
                  >
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
                    {profileInfo.displayName === "" ? (
                      <>
                        <p className="placeholder-glow ">
                          <span
                            className="placeholder"
                            style={{ width: "100px" }}
                          ></span>
                        </p>
                      </>
                    ) : (
                      <>
                        <h2 className="text-center">
                          {profileInfo.displayName}
                        </h2>
                      </>
                    )}

                    <p className="text-muted">{auth.user.email}</p>
                    <p>{profileInfo.bio}</p>
                  </div>
                  <div className="card w-100" style={{ border: "none" }}>
                    <div className="d-flex w-100 px-5">
                      <div
                        className="d-flex align-items-center justify-content-center w-30 h-100"
                        style={{ cursor: "pointer" }}
                      >
                        <h6>
                          Followers :{" "}
                          <span className="text-muted">coming soon</span>
                        </h6>
                      </div>

                      <div
                        className="d-flex align-items-center justify-content-center w-30 h-100"
                        style={{ cursor: "pointer" }}
                      >
                        <h6>
                          Following :{" "}
                          <span className="text-muted">coming soon</span>
                        </h6>
                      </div>

                      <div
                        className="d-flex w-30 align-items-center justify-content-center "
                        style={{ cursor: "pointer" }}
                      >
                        <h6>Posts : {postCount}</h6>
                      </div>
                    </div>
                  </div>
                  <CreateFbPost />
                  <div className="card-footer w-100 d-flex justify-content-end">
                    <div
                      className="btn  m-1 text-light"
                      style={{ zIndex: "2", backgroundColor: "#684d9d" }}
                      onClick={handleProfileEditModal}
                    >
                      Edit Profile
                    </div>
                    <div
                      className="btn  m-1 text-light"
                      style={{ zIndex: "2", backgroundColor: "#684d9d" }}
                      onClick={handleChangePasswordModal}
                    >
                      Change Password
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-8 d-flex align-items-center flex-column">
                {/* <ReviewArray mode="edit" parent_email={auth.user.email} /> */}

                <PostsArray mode="add" />
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default profile;
