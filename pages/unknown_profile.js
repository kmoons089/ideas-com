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

const unknown_profile = () => {
  const route = useRouter();
  const other_email = route.query;
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
  const auth = useAuth();
  const [parent_email, setParent_email] = useState(other_email.data);

  useEffect(() => {
    // var key = Object.keys(other_email);
    console.log(other_email.data);
    setParent_email(other_email.data);
    const getData = async () => {
      await FirestoreService.getProfileInfo(other_email.data)
        .then((response) => {
          setProfileInfo((prev) => ({
            ...prev,
            owner_email:
              response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
                .fields.owner_email.stringValue,
            displayName:
              response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
                .fields.displayName.stringValue,
            bio: response._delegate._snapshot.docChanges[0].doc.data.value
              .mapValue.fields.bio.stringValue
              ? response._delegate._snapshot.docChanges[0].doc.data.value
                  .mapValue.fields.bio.stringValue
              : ". . .",
            // img: response._delegate._snapshot.docChanges[0].doc.data.value
            //   .mapValue.fields.img.stringValue,
          }));
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getData();
  }, []);

  return (
    <>
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
                    <p className="text-muted">{profileInfo.owner_email}</p>
                    <p>{profileInfo.bio}</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-8 d-flex align-items-center ">
                <PostsList mode="edit" parent_email={parent_email} />
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default unknown_profile;
