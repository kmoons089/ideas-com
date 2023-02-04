import React, { useState, useEffect } from "react";
import Image from "next/image";
import img from "../public/img/loginvector.png";
import { Button } from "react-bootstrap";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBSpinner,
} from "mdb-react-ui-kit";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { Form } from "react-bootstrap";
import { useRouter } from "next/router";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import FirestoreService from "../utils/FirestoreService";
import { stringify } from "@firebase/util";

const Register = () => {
  const router = useRouter();
  const { user, signup } = useAuth();
  const [data, setData] = useState({
    owner_email: "",
    password: "",
    ConfirmPassword: "",
    displayName: "",
    img: "",
    bio: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  /* ------------------------------ handleSignup ------------------------------ */
  const handleSignup = async (e) => {
    setLoading(true);
    console.log(stringify(data));
    if (data.owner_email === "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (data.displayName === "") {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (data.password === "" || data.ConfirmPassword === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (data.password.length < 8) {
      setPasswordError(true);
      alert("Fill aleast 8 letters for password");
    } else {
      setPasswordError(false);
    }

    if (data.password !== data.ConfirmPassword) {
      setPasswordError(true);
      alert(
        "Password and confirm password must be the same. Like all girls are ths same."
      );
    } else {
      // setPasswordError(false);
    }
    if (
      data.owner_email === "" ||
      data.displayName === "" ||
      data.password === "" ||
      data.ConfirmPassword === "" ||
      data.password.length < 8 ||
      data.password !== data.ConfirmPassword
    ) {
      //above are all errors
      setLoading(false);
      return;
    }
    e.preventDefault();

    try {
      await signup(data.owner_email, data.password).then(async () => {
        await FirestoreService.addProfileData(data)
          .then(console.log("Profile data added : "))
          .catch((error) => {
            setLoading(false);
            return;
          })
          .finally(() => {
            setLoading(false);
            router.push("/");
          });
      });
    } catch (err) {
      // if ((err.message = "Firebase: Error (auth/invalid-email).")) {
      //   alert(
      //     "Invalid Email Or Already Used Email Or Too Short Password (Password must includes at least 6 characters)"
      //   );
      // }
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
      alert("You have registered successfully.Enjoy the new experience.");
    }
  }, [user]);
  /* --------------------------------- return --------------------------------- */
  return (
    <>
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <Form>
          <MDBRow>
            <MDBCol col="10" md="6">
              {/* <div className="d-flex flex-row align-items-center justify-content-center text-danger text-center">
                <h5>
                  <WarningAmberIcon sx={{ fontSize: 70 }} />
                  REGISTER NOW AND ENJOY NEW EXPERIENCE{" "}
                  <WarningAmberIcon sx={{ fontSize: 70 }} />
                </h5>
              </div> */}
              <Image
                src={img}
                className="img-fluid"
                alt="Sample image"
                priority="true"
              />
            </MDBCol>

            <MDBCol col="4" md="6">
              <div className="d-flex flex-row align-items-center justify-content-center">
                <h1>
                  <b>REGISTER</b>
                </h1>
              </div>

              <div className="divider d-flex align-items-center my-4"></div>
              <label htmlFor="formFile" className="form-label">
                Name :
              </label>
              {nameError && (
                <>
                  <p className="text-danger">
                    Please fill this field correctly
                  </p>
                </>
              )}
              <MDBInput
                maxLength="20"
                wrapperClass="mb-4"
                type="text"
                // placeholder="Enter nickname "
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    displayName: e.target.value,
                  })
                }
                value={data.displayName}
                size="lg"
              />
              <label htmlFor="formFile" className="form-label">
                Email :
              </label>
              {emailError && (
                <>
                  <p className="text-danger">
                    Please fill this field correctly
                  </p>
                </>
              )}
              <MDBInput
                wrapperClass="mb-4"
                type="email"
                // placeholder="Enter email"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    owner_email: e.target.value,
                  })
                }
                value={data.email}
                autoComplete="current-email"
                size="lg"
              />
              <p className="text-danger">
                Remember your password becuz we dont have "forget password"
                feature yet. But you can contact the admin [09-952168823].
              </p>
              <label htmlFor="formFile" className="form-label">
                Password (at least 8 letters) :
              </label>

              {passwordError && (
                <>
                  <p className="text-danger">
                    Please fill this field correctly
                  </p>
                </>
              )}
              <MDBInput
                minLength="8"
                wrapperClass="mb-4"
                type="password"
                // placeholder="Password"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    password: e.target.value,
                  })
                }
                value={data.password}
                autoComplete="new-password"
                size="lg"
              />
              <label htmlFor="formFile" className="form-label">
                Confirm Password :
              </label>
              {passwordError && (
                <>
                  <p className="text-danger">
                    Please fill this field correctly
                  </p>
                </>
              )}
              <MDBInput
                wrapperClass="mb-4"
                type="password"
                // placeholder="Password"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    ConfirmPassword: e.target.value,
                  })
                }
                value={data.ConfirmPassword}
                autoComplete="new-password"
                size="lg"
              />

              <div className="text-center text-md-start mt-4 pt-2">
                <div
                  style={{
                    backgroundColor: "#6741b3",
                    border: "none",
                    color: "white",
                  }}
                  className="btn mb-0 px-5"
                  onClick={handleSignup}
                >
                  {loading ? (
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
                    <> REGISTER</>
                  )}
                </div>
                <p className="small fw-bold mt-2 pt-1 mb-2">
                  Already had an account?
                  <Link href="/login" className="link-danger">
                    LOGIN
                  </Link>
                </p>
              </div>
            </MDBCol>
          </MDBRow>
        </Form>
      </MDBContainer>
    </>
  );
};

export default Register;
