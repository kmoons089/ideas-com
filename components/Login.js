import React, { useEffect, useState } from "react";
import Image from "next/image";
import img from "../public/img/loginvector.png";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCardText,
  MDBSpinner,
} from "mdb-react-ui-kit";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";

import "firebase/compat/auth";

import { useRouter } from "next/router";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const router = useRouter();
  const [noUser, setNoUser] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const { user, login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState(false);

  const [loading, setLoading] = useState(false);

  function isEmail(email) {
    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(
      email
    );
  }

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (data.email === "") {
      setEmailError(true);
    }
    if (data.password === "") {
      setWrongPassword(true);
    }

    if (!isEmail(data.email)) {
      setEmailError(true);
    }

    if (data.email === "" || data.password === "" || !isEmail(data.email)) {
      setLoading(false);
      return;
    }

    try {
      await login(data.email, data.password)
        .then((response) => {
          console.log(response);
          router.push("/");
        })
        .catch((e) => {
          if (e.code === "auth/wrong-password") {
            alert("Wrong Password");
          }
          if (e.code === "auth/user-not-found") {
            alert("User not found.");
          }
          if (e.code === "auth/too-many-requests") {
            alert("too many requests , try after a few mins");
          }
          console.log(e.code);
        });
      sessionStorage.setItem("noUser", false);
      sessionStorage.setItem("wrongPassword", false);
    } catch (err) {
      if (err.message == "Firebase: Error (auth/user-not-found).") {
        sessionStorage.setItem("noUser", true);
        console.log("no user");
        return null;
      } else if (err.message == "Firebase: Error (auth/wrong-password).") {
        sessionStorage.setItem("noUser", false);
        sessionStorage.setItem("wrongPassword", true);
        console.log("worn pq");
        return null;
      }
    }
    setLoading(false);
  };

  const handleForgetPassword = () => {
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "kmoons089@gmail.com",
      Password: "577CCD7D47A1BD2ACE6FEAC98897EEADBBB1",
      To: "them@website.com",
      From: "you@isp.com",
      Subject: "This is the subject",
      Body: "And this is the body",
    }).then((message) => alert(message));
  };

  useEffect(() => {
    if (user) {
      router.push("/");
      alert("You have logged in successfully.Enjoy the new experience.");
    }
  }, []);

  useEffect(() => {
    setNoUser(JSON.parse(sessionStorage.getItem("noUser", noUser)));
    setWrongPassword(
      JSON.parse(sessionStorage.getItem("wrongPassword", wrongPassword))
    );
  }, []);

  useEffect(() => {
    window.onbeforeunload = function () {
      console.log("refresh");
      sessionStorage.setItem("wrongPassword", false);
      sessionStorage.setItem("noUser", false);
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <>
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <Form>
          <MDBRow>
            <MDBCol col="10" md="6">
              {/* <div className="d-flex flex-row align-items-center justify-content-center text-danger text-center">
                <h5>
                  <WarningAmberIcon sx={{ fontSize: 70 }} />
                  LOGIN NOW AND ENJOY NEW EXPERIENCE{" "}
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
                  <b>LOGIN</b>
                </h1>
              </div>

              <div className="divider d-flex align-items-center my-4"></div>

              <label htmlFor="formFile" className="form-label">
                Email :
              </label>
              {noUser && (
                <>
                  <p className="text-danger">No user with that email.</p>
                </>
              )}
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
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    email: e.target.value,
                  })
                }
                value={data.email}
                autoComplete="off"
                size="lg"
              />
              <label htmlFor="formFile" className="form-label">
                Password :
              </label>
              {wrongPassword && (
                <>
                  <p className="text-danger">Wrong Password.</p>
                </>
              )}
              <MDBInput
                wrapperClass="mb-4"
                type="password"
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    password: e.target.value,
                  })
                }
                autoComplete="new-password"
                value={data.password}
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
                  onClick={handleLogin}
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
                    <> LOGIN</>
                  )}
                </div>
                <p className="text-danger">
                  If you forget password,you can contact the admin
                  [09-952168823]
                </p>
                {/* <a
                  href="#"
                  style={{
                    marginLeft: "20px",
                    textDecoration: "none",
                  }}
                  onClick={handleForgetPassword}
                >
                  Forget Password
                </a> */}
                <p className="small fw-bold mt-2 pt-1 mb-2">
                  Don't have an account?
                  <Link href="/register" className="link-danger">
                    Register
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

export default Login;
