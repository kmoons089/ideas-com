import React, { useEffect, useState } from "react";
import Image from "next/image";
import img from "../public/img/loginvector.png";

import { Card, Form, Button } from "react-bootstrap";
import Link from "next/link";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firestore";

import { useRouter } from "next/router";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const router = useRouter();
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <Card style={{ margin: 24 }}>
        <Card.Header>
          <Image
            src={img}
            className="d-block w-50 h-auto"
            alt=""
            priority="true"
          />
          <h4>Admin Login</h4>
          <p style={{ marginTop: 8, fontSize: 12, color: "#A1A1A1" }}>
            If you're an admin of Nandos please login below. If you don't have
            an account please contact your administrator to get a login.
          </p>
        </Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter admin email"
                size="md"
                value={data.email}
                required
                onChange={(e) =>
                  setData({
                    ...data,
                    email: e.target.value,
                  })
                }
                autoComplete="current-email"
              />
              <Form.Control.Feedback type="invalid">
                Email is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                size="md"
                value={data.password}
                current-password="true"
                onChange={(e) =>
                  setData({
                    ...data,
                    password: e.target.value,
                  })
                }
                autoComplete="current-password"
              />
              <Form.Control.Feedback type="invalid">
                Password is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              size="md"
              style={{ fontWeight: "bold" }}
            >
              Login ❯
            </Button>
            {/* <p>{user.email}</p> */}
          </Form>
        </Card.Body>
        <Card.Footer>
          <a href="/" style={{ marginTop: 8, fontSize: 12 }}>
            ← Back to homepage
          </a>
        </Card.Footer>
      </Card>
    </>
  );
};

export default Login;
