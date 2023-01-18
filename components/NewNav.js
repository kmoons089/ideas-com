import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Logo from "./Logo";

const NewNav = () => {
  const [home, setHome] = useState(false);
  const [about, setAbout] = useState(false);
  const [html, setHtml] = useState(false);
  const [java, setJava] = useState(false);
  const [pp, setPp] = useState(false);
  const [hw, setHw] = useState(false);
  const [review, setReview] = useState(false);
  const [sideBar, setSideBar] = useState(false);

  const route = useRouter();

  useEffect(() => {
    const p = route.pathname;
    if (p == "/") {
      setHome(true);
      setAbout(false);
      setHtml(false);
      setJava(false);
      setPp(false);
      setHw(false);
      setReview(false);
    } else if (p == "/about") {
      setHome(false);
      setAbout(true);
      setHtml(false);
      setJava(false);
      setPp(false);
      setHw(false);
      setReview(false);
    } else if (p == "/html") {
      setHome(false);
      setAbout(false);
      setHtml(true);
      setJava(false);
      setPp(false);
      setHw(false);
      setReview(false);
    } else if (p == "/java") {
      setHome(false);
      setAbout(false);
      setHtml(false);
      setJava(true);
      setPp(false);
      setHw(false);
      setReview(false);
    } else if (p == "/pp") {
      setHome(false);
      setAbout(false);
      setHtml(false);
      setJava(false);
      setPp(true);
      setHw(false);
      setReview(false);
    } else if (p == "/hw") {
      setHome(false);
      setAbout(false);
      setHtml(false);
      setJava(false);
      setPp(false);
      setHw(true);
      setReview(false);
    } else if (p == "/review") {
      setHome(false);
      setAbout(false);
      setHtml(false);
      setJava(false);
      setPp(false);
      setHw(false);
      setReview(true);
    } else {
      setHome(false);
      setAbout(false);
      setHtml(false);
      setJava(false);
      setPp(false);
      setHw(false);
      setReview(false);
    }
  }, [route]);

  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark position-fixed "
        style={{ width: "380px", height: "100vh", zIndex: "3", right: 0 }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none  p-1 pe-1 mt-5"
        >
          <Logo />
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item bghover">
            <a
              href="/"
              className={home ? "nav-link active" : "nav-link text-white "}
              aria-current="page"
            >
              Home
            </a>
          </li>
          <li className="nav-item bghover">
            <a
              href="/about"
              className={about ? "nav-link active" : "nav-link text-white"}
            >
              About
            </a>
          </li>
          <li className="nav-item bghover">
            <a
              href="/html"
              className={html ? "nav-link active" : "nav-link text-white"}
            >
              Html
            </a>
          </li>
          <li className="nav-item bghover">
            <a
              href="/java"
              className={java ? "nav-link active" : "nav-link text-white"}
            >
              Java
            </a>
          </li>
          <li className="nav-item bghover">
            <a
              href="/pp"
              className={pp ? "nav-link active" : "nav-link text-white"}
            >
              PowerPoint
            </a>
          </li>
          <li className="nav-item bghover">
            <a
              href="/hw"
              className={hw ? "nav-link active" : "nav-link text-white"}
            >
              Hardware
            </a>
          </li>
          <li className="nav-item bghover">
            <a
              href="/review"
              className={review ? "nav-link active" : "nav-link text-white"}
            >
              Posts
            </a>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a
            href="/profile"
            className="d-flex align-items-center text-white text-decoration-none "
          >
            <img
              src="https://freesvg.org/img/abstract-user-flat-4.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>Profile</strong>
          </a>
        </div>
      </div>
    </>
  );
};

export default NewNav;
