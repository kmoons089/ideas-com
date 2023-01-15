import React, { useEffect, useState } from "react";
import Image from "next/image";
import img from "../public/img/loginvector.png";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCardText,
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

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(user);
    try {
      await login(data.email, data.password).then(router.push("/review"));
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
              <div className="d-flex flex-row align-items-center justify-content-center text-danger text-center">
                <h5>
                  <WarningAmberIcon sx={{ fontSize: 70 }} />
                  LOGIN NOW AND ENJOY NEW EXPERIENCE{" "}
                  <WarningAmberIcon sx={{ fontSize: 70 }} />
                </h5>
              </div>
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
              {noUser && (
                <>
                  <p className="text-danger">No user with that email.</p>
                </>
              )}
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                type="email"
                placeholder="Enter email"
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
              {wrongPassword && (
                <>
                  <p className="text-danger">Wrong Password.</p>
                </>
              )}
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                type="password"
                placeholder="Password"
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
                <Button className="mb-0 px-5" onClick={handleLogin}>
                  LOGIN
                </Button>
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
