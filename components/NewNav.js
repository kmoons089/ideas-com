import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Logo from "./Logo";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ProfileCard from "./ProfileCard";

const NewNav = ({ name, img }) => {
  const [home, setHome] = useState(false);
  const [about, setAbout] = useState(false);
  const [html, setHtml] = useState(false);
  const [java, setJava] = useState(false);
  const [pp, setPp] = useState(false);
  const [hw, setHw] = useState(false);
  const [review, setReview] = useState(false);
  const [posts, setPosts] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const [showProjects, setShowProject] = useState(true);
  const [showProfileCard, setShowProfileCard] = useState(false);

  const route = useRouter();

  const handleProjects = () => {
    setShowProject(!showProjects);
  };

  const handleProfilesCard = () => {
    setShowProfileCard(!showProfileCard);
  };

  useEffect(() => {
    console.log(showProjects);
    const p = route.pathname;
    if (p == "/") {
      setHome(true);
      setAbout(false);
      setHtml(false);
      setJava(false);
      setPp(false);
      setHw(false);
      setReview(false);
      setPosts(false);
    } else if (p == "/about") {
      setHome(false);
      setAbout(true);
      setHtml(false);
      setJava(false);
      setPp(false);
      setHw(false);
      setReview(false);
      setPosts(false);
    } else if (p == "/html") {
      setHome(false);
      setAbout(false);
      setHtml(true);
      setJava(false);
      setPp(false);
      setHw(false);
      setReview(false);
      setPosts(false);
    } else if (p == "/java") {
      setHome(false);
      setAbout(false);
      setHtml(false);
      setJava(true);
      setPp(false);
      setHw(false);
      setReview(false);
      setPosts(false);
    } else if (p == "/pp") {
      setHome(false);
      setAbout(false);
      setHtml(false);
      setJava(false);
      setPp(true);
      setHw(false);
      setReview(false);
      setPosts(false);
    } else if (p == "/hw") {
      setHome(false);
      setAbout(false);
      setHtml(false);
      setJava(false);
      setPp(false);
      setHw(true);
      setReview(false);
      setPosts(false);
    } else if (p == "/review") {
      setHome(false);
      setAbout(false);
      setHtml(false);
      setJava(false);
      setPp(false);
      setHw(false);
      setReview(true);
      setPosts(false);
    } else if (p == "/posts") {
      setHome(false);
      setAbout(false);
      setHtml(false);
      setJava(false);
      setPp(false);
      setHw(false);
      setReview(false);
      setPosts(true);
    } else {
      setHome(false);
      setAbout(false);
      setHtml(false);
      setJava(false);
      setPp(false);
      setHw(false);
      setReview(false);
      setPosts(false);
    }
  }, [route]);

  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white position-fixed "
        style={{
          width: "380px",
          height: "100vh",
          zIndex: "4",
          right: 0,
          backgroundColor: "#36225d",
        }}
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
              style={{ background: home ? "#4a2f80" : "", color: "white" }}
              className={home ? "nav-link " : "nav-link text-white "}
            >
              Home
            </a>
          </li>
          <li className="nav-item bghover">
            <a
              href="/about"
              style={{ background: about ? "#4a2f80" : "", color: "white" }}
              className={about ? "nav-link " : "nav-link text-white"}
            >
              About
            </a>
          </li>

          <li className="nav-item bghover " onClick={handleProjects}>
            <a className={"nav-link text-white"}>
              Projects
              {showProjects ? (
                <>
                  <ExpandMoreIcon />
                </>
              ) : (
                <>
                  <ChevronRightIcon />
                </>
              )}
            </a>
          </li>
          <li className="nav-item ">
            {showProjects && (
              <>
                <ul>
                  <li className="nav-item bghover">
                    <a
                      href="/html"
                      style={{
                        background: html ? "#4a2f80" : "",
                        color: "white",
                      }}
                      className={html ? "nav-link " : "nav-link text-white"}
                    >
                      Html
                    </a>
                  </li>
                  <li className="nav-item bghover">
                    <a
                      href="/java"
                      style={{
                        background: java ? "#4a2f80" : "",
                        color: "white",
                      }}
                      className={java ? "nav-link " : "nav-link text-white"}
                    >
                      Java
                    </a>
                  </li>
                  <li className="nav-item bghover">
                    <a
                      href="/pp"
                      style={{
                        background: pp ? "#4a2f80" : "",
                        color: "white",
                      }}
                      className={pp ? "nav-link " : "nav-link text-white"}
                    >
                      PowerPoint
                    </a>
                  </li>
                  <li className="nav-item bghover">
                    <a
                      href="/hw"
                      style={{
                        background: hw ? "#4a2f80" : "",
                        color: "white",
                      }}
                      className={hw ? "nav-link " : "nav-link text-white"}
                    >
                      Hardware
                    </a>
                  </li>
                </ul>
              </>
            )}
          </li>

          <li className="nav-item bghover">
            <a
              href="/review"
              style={{
                background: review ? "#4a2f80" : "",
                color: "white",
              }}
              className={review ? "nav-link " : "nav-link text-white"}
            >
              Reviews
            </a>
          </li>
          <li className="nav-item bghover">
            <a
              href="/posts/categories/all"
              style={{
                background: posts ? "#4a2f80" : "",
                color: "white",
              }}
              className={posts ? "nav-link " : "nav-link text-white"}
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
              src={
                img ? img : "https://freesvg.org/img/abstract-user-flat-4.png"
              }
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
              style={{ objectFit: "cover" }}
            />
            <strong>{name}</strong>
          </a>
        </div>
      </div>
      {showProfileCard && (
        <>
          <ProfileCard />
        </>
      )}
    </>
  );
};

export default NewNav;
