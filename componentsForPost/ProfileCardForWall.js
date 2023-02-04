import React, { useEffect, useState } from "react";
import FirestoreService from "../utils/FirestoreService";

const ProfileCardForWall = () => {
  const [profileInfo, setProfileInfo] = useState({
    displayName: "",
    bio: "",
    img: "",
    owner_email: "",
  });

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

        <h2 className="text-center">{profileInfo.displayName}</h2>
        <p className="text-muted">{auth.user.email}</p>
        <p
          style={{
            color: "green",
          }}
        >
          {profileInfo.bio}
        </p>
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
      </div>
    </div>
  );
};

export default ProfileCardForWall;
