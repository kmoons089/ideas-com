import React, { useState, useEffect } from "react";
import Image from "next/image";
import img from "../public/img/loginvector.png";
import { Button } from "react-bootstrap";
import { MDBContainer, MDBCol, MDBRow, MDBInput } from "mdb-react-ui-kit";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { Form } from "react-bootstrap";
import { useRouter } from "next/router";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import FirestoreService from "../utils/FirestoreService";

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
  const [passwordError, setPasswordError] = useState(false);
  /* ------------------------------ handleSignup ------------------------------ */
  const handleSignup = async (e) => {
    if (data.password !== data.ConfirmPassword) {
      setPasswordError(true);
      return;
    }
    e.preventDefault();

    try {
      await signup(data.owner_email, data.password).then(async () => {
        router.push("/");
        await FirestoreService.addProfileData(data).then(
          console.log("Profile data added : ")
        );
      });
    } catch (err) {
      if ((err.message = "Firebase: Error (auth/invalid-email).")) {
        alert(
          "Invalid Email Or Already Used Email Or Too Short Password (Password must includes at least 6 characters)"
        );
      }
      console.log(err);
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
              <MDBInput
                wrapperClass="mb-4"
                label="Display name"
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

              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
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
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
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
              {passwordError && (
                <>
                  <p className="text-danger">Passwords are not same.</p>
                </>
              )}
              <MDBInput
                wrapperClass="mb-4"
                label="Confirm Password"
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
                  REGISTER
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
