import React, { useEffect, useState } from "react";
import Image from "next/image";
import img from "../public/img/loginvector.png";
import { Button } from "react-bootstrap";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { Form } from "react-bootstrap";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const { user, signup } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  /* ------------------------------ handleSignup ------------------------------ */
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signup(data.email, data.password).then(router.push("/review"));
    } catch (err) {
      console.log(err);
    }

    console.log(data);
  };
  /* --------------------------------- return --------------------------------- */
  return (
    <>
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <Form>
          <MDBRow>
            <MDBCol col="10" md="6">
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
                autoComplete="current-email"
                size="lg"
              />
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
                value={data.password}
                autoComplete="current-password"
                size="lg"
              />

              <div className="text-center text-md-start mt-4 pt-2">
                <Button className="mb-0 px-5" onClick={handleSignup}>
                  REGISTER
                </Button>
                <p className="small fw-bold mt-2 pt-1 mb-2">
                  Don't have an account?
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
