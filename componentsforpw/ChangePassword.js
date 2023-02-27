import React, { useEffect, useState } from "react";
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
import FirestoreServiceForPosts from "../utils/FirestoreServiceForPosts";
import { useAuth } from "../context/AuthContext";

const ChangePassword = ({
  varyingModal_forPw,
  setVaryingModal_forPw,
  handleChangePasswordModal,
  profileId,
  profileInfo,
}) => {
  const auth = useAuth();
  const [saveChangesBtn, setSaveChangesBtn] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [wrongPw, setWrongPw] = useState(false);
  const [notSamePw, setNotSamePw] = useState(false);
  const [eightError, setEightError] = useState(false);
  const [pw, setPw] = useState();

  const passwordMatch = (currentPw) => {
    console.log(pw);
    if (currentPw == pw) {
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
    }
  };
  const passwordSame = (newPw, confirmPw) => {
    if (newPw == "" || newPw.length < 8) {
      setEightError(true);
      return false;
    } else {
      setEightError(false);
      if (newPw == confirmPw) {
        setNotSamePw(false);
        console.log(true);
        return true;
      } else {
        setNotSamePw(true);
        console.log(false);
        return false;
      }
    }
  };
  /* --------------------------------- submit --------------------------------- */
  const submit = async () => {
    setSaveChangesBtn(true);
    if (!passwordMatch(currentPw)) {
      setWrongPw(true);
    } else if (passwordMatch(currentPw)) {
      setWrongPw(false);
    }
    if (passwordSame(newPw, confirmPw) && (await passwordMatch(currentPw))) {
      console.log("OK ! to change password.");
      await FirestoreServiceForPosts.updatePassword(profileId, newPw)
        .then((response) => {
          console.log(response);
          setSaveChangesBtn(false);
          handleChangePasswordModal();
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setSaveChangesBtn(false);
    }
  };
  /* -------------------------------- get data -------------------------------- */
  useEffect(() => {
    const getData = async () => {
      await FirestoreServiceForPosts.getPassword(auth.user.email)
        .then((response) => {
          // console.log(
          //   response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
          //     .fields.password.stringValue
          // );
          setPw(
            response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
              .fields.password.stringValue
          );
        })
        .catch((e) => {
          console.log("error on get password");
        });
    };
    getData();
  }, []);

  return (
    <>
      <MDBModal
        staticBackdrop
        show={varyingModal_forPw}
        setShow={setVaryingModal_forPw}
        tabIndex="-1"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Change Password</MDBModalTitle>
              <Button
                className="btn-close"
                color="none"
                onClick={handleChangePasswordModal}
              ></Button>
            </MDBModalHeader>
            <MDBModalBody>
              <form>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Current Password :
                  </label>
                  {wrongPw && (
                    <p className="text-danger">
                      <small>Wrong Password</small>
                    </p>
                  )}
                  <MDBInput
                    type="password"
                    labelClass="col-form-label"
                    required
                    value={currentPw}
                    onChange={(e) => {
                      //   setData({ ...data, displayName: e.target.value });
                      setCurrentPw(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    New Password :
                  </label>
                  {eightError && (
                    <p className="text-danger">
                      {" "}
                      <small>Password must be at least 8 letters</small>
                    </p>
                  )}
                  {notSamePw && (
                    <p className="text-danger">
                      {" "}
                      <small>
                        Passwords must be the same with confirm new Password
                      </small>
                    </p>
                  )}
                  <MDBInput
                    type="password"
                    labelClass="col-form-label"
                    required
                    value={newPw}
                    onChange={(e) => {
                      //   setData({ ...data, displayName: e.target.value });
                      setNewPw(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Confirm New Password :
                  </label>
                  <MDBInput
                    type="password"
                    labelClass="col-form-label"
                    required
                    value={confirmPw}
                    onChange={(e) => {
                      //   setData({ ...data, displayName: e.target.value });
                      setConfirmPw(e.target.value);
                    }}
                  />
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
                color="secondary"
                onClick={handleChangePasswordModal}
              >
                Close
              </div>
              <div
                className="btn"
                style={{
                  backgroundColor: "#684d9d",
                  color: "white",
                }}
                onClick={submit}
              >
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
              </div>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default ChangePassword;
