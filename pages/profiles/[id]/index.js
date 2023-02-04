import React, { useEffect, useState } from "react";

import { Button, Container } from "react-bootstrap";
import { Loader } from "../../../components/Loader";
import CreateFbPost from "../../../componentsForPost/CreateFbPost";
import { useAuth } from "../../../context/AuthContext";

import { useRouter } from "next/router";
import FirestoreService from "../../../utils/FirestoreService";
import FirestoreServiceForPosts from "../../../utils/FirestoreServiceForPosts";
import PostsArray from "../../../componentsForPost/PostsArray";

const unknown_profile = () => {
  const route = useRouter();

  const [loading, setLoading] = useState(false);

  const [profileInfo, setProfileInfo] = useState({
    displayName: "",
    bio: "",
    img: "",
    owner_email: "",
  });
  const [postCount, setPostCount] = useState(0);
  const auth = useAuth();

  useEffect(() => {
    const search_email = route.query;
    console.log(search_email.id);

    const getData = async () => {
      await FirestoreServiceForPosts.getProfilePosts(search_email.id)

        .then((response) => {
          console.log(response._delegate._snapshot.docChanges.length);
          setPostCount(response._delegate._snapshot.docChanges.length);
        })
        .then(() => {
          setLoading(false);
        })
        .catch((e) => {
          console.log("Error occured while fetching profile info " + e);
          console.log(e);
        });

      await FirestoreService.getProfileInfo(search_email.id)
        .then((response) => {
          setProfileInfo((prev) => ({
            ...prev,
            img: response._delegate._snapshot.docChanges[0].doc.data.value
              .mapValue.fields.img.stringValue,
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
                <div className="card  w-100  align-items-center shadow mt-3 ">
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

                    <h2 className="text-center">{profileInfo.displayName}</h2>
                    <p className="text-muted">{profileInfo.owner_email}</p>
                    <p>{profileInfo.bio}</p>
                  </div>
                  <div
                    className="card w-100 "
                    style={{ border: "none", marginBottom: "20px" }}
                  >
                    <div className="d-flex w-100">
                      <div
                        className="d-flex align-items-center justify-content-center w-50 h-100"
                        style={{ cursor: "pointer" }}
                      >
                        <h6>
                          Followers :{" "}
                          <span className="text-muted">coming soon</span>
                        </h6>
                      </div>

                      <div
                        className="d-flex w-50 align-items-center justify-content-center "
                        style={{ cursor: "pointer" }}
                      >
                        <h6>Posts : {postCount}</h6>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer w-100"></div>
                </div>
              </div>
              <div className="col-sm-8 d-flex align-items-center ">
                <PostsArray />
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default unknown_profile;
