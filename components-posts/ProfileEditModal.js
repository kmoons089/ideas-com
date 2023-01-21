import React, { ChangeEvent, useEffect, useState } from "react";
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
import { Button } from "react-bootstrap";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../utils/firestore";
import { uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useAuth } from "../context/AuthContext";
import FirestoreService from "../utils/FirestoreService";
import { useRouter } from "next/router";

export default function ProfileEditModal({
  varyingModal_forProfile,
  setVaryingModal_forProfile,
  handleProfileEditModal,
  profileId,
  profileInfo,
}) {
  const auth = useAuth();
  const route = useRouter();
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    img: "",
    displayName: "",
    bio: "",
    owner_email: "",
  });
  const [saveChangesBtn, setSaveChangesBtn] = useState(false);
  /* ---------------------------- handleProfileInfo --------------------------- */
  const handleProfileInfo = async () => {
    setSaveChangesBtn(true);
    if (file == null) {
      console.log("fill null");
      //setData((prev) => ({ ...prev, img: null }));
      var url = profileInfo.img;
      console.log(url);
      await FirestoreService.updateProfileData(data, profileId, url).then(
        () => {
          console.log("success");
        }
      );
      setSaveChangesBtn(false);
      route.reload("/profile");
    } else {
      console.log("img uploading >>>");
      const imageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(imageRef, file).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then(async (url) => {
          setData(async (prev) => ({
            ...prev,
            img: url,
          }));
          await FirestoreService.updateProfileData(data, profileId, url).then(
            () => {
              console.log("success");
            }
          );
          setSaveChangesBtn(false);
          route.reload("/profile");
        });
      });
    }

    handleProfileEditModal();
    // route.reload("/profile");
  };
  /* -------------------------------- useEffect ------------------------------- */
  useEffect(() => {
    setData({ ...data, owner_email: auth.user.email });
    setData((prev) => ({
      ...prev,
      displayName: profileInfo.displayName,
      bio: profileInfo.bio,
      img: profileInfo.img,
    }));
  }, []);
  return (
    <>
      <MDBModal
        staticBackdrop
        show={varyingModal_forProfile}
        setShow={setVaryingModal_forProfile}
        tabIndex="-1"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Profile Card</MDBModalTitle>
              <Button
                className="btn-close"
                color="none"
                onClick={handleProfileEditModal}
              ></Button>
            </MDBModalHeader>
            <MDBModalBody>
              <form>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Profile Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    id="formFile"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Nick Name :
                  </label>
                  <MDBInput
                    labelClass="col-form-label"
                    required
                    value={data.displayName}
                    onChange={(e) => {
                      setData({ ...data, displayName: e.target.value });
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Bio :
                  </label>
                  <MDBTextArea
                    labelClass="col-form-label"
                    required
                    value={data.bio}
                    onChange={(e) => {
                      setData({ ...data, bio: e.target.value });
                    }}
                  />
                </div>
              </form>
            </MDBModalBody>
            <MDBModalFooter>
              <Button color="secondary" onClick={handleProfileEditModal}>
                Close
              </Button>
              <Button onClick={handleProfileInfo}>
                {saveChangesBtn ? (
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
                  <>Save Changes</>
                )}
              </Button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
