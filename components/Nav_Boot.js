import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Logo from "./Logo";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import NewNav from "./NewNav";
import MenuIcon from "@mui/icons-material/Menu";

const Nav_Boot = () => {
  const { user, logout } = useAuth();
  const [sideBar, setSideBar] = useState(false);
  const router = useRouter();

  return (
    <>
      {sideBar && (
        <>
          <div>
            <NewNav />
            <span
              style={{
                color: "white",
                padding: "3px",
                right: "0",
                position: "fixed",
                backgroundColor: "#212529",
                zIndex: "3",
              }}
              onClick={() => {
                setSideBar(false);
              }}
            >
              <MenuIcon sx={{ fontSize: 40 }} />
            </span>
          </div>
        </>
      )}
      <div className="z-3 ">
        <header
          className="d-flex flex-wrap justify-content-center py-1  border-bottom align-items-center bg-dark"
          style={{}}
        >
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none justify-content-center  rounded "
          >
            <Logo />
          </a>

          <ul className="nav nav-pills">
            <li className="nav-item">
              {user ? (
                <div className="d-flex">
                  <a
                    href="/profile"
                    className="btn btn-light ms-3 mt-1 d-flex align-items-center justify-content-center"
                  >
                    <img
                      src="https://freesvg.org/img/abstract-user-flat-4.png"
                      alt=""
                      width="32"
                      height="32"
                      className="rounded-circle me-2 me-2"
                    />
                    <h5>Profile</h5>
                  </a>
                  <a className="btn btn-dark ms-3 mt-1 d-flex align-items-center justify-content-center text-light">
                    <h5
                      onClick={() => {
                        logout();
                        router.push("/login");
                      }}
                    >
                      Logout
                    </h5>
                  </a>
                  <a
                    className="btn text-light ms-3 mt-1 d-flex"
                    style={{ color: "balck" }}
                    onClick={() => {
                      setSideBar(true);
                    }}
                  >
                    <MenuIcon sx={{ fontSize: 40 }} />
                  </a>
                </div>
              ) : (
                <>
                  <div className="d-flex">
                    <a
                      href="/register"
                      className="d-flex btn btn-light ms-3 mt-1 align-items-center justify-content-center"
                    >
                      <h5>Signup</h5>
                    </a>
                    <a
                      href="/login"
                      className="d-flex btn btn-light ms-3 mt-1 align-items-center justify-content-center"
                    >
                      <h5>Login</h5>
                    </a>
                    <a
                      className="d-flex btn text-light ms-3 align-items-center justify-content-center"
                      style={{ color: "balck" }}
                      onClick={() => {
                        setSideBar(true);
                      }}
                    >
                      <MenuIcon sx={{ fontSize: 40 }} />
                    </a>
                  </div>
                </>
              )}
            </li>
          </ul>
        </header>
      </div>
    </>
  );
};

export default Nav_Boot;
