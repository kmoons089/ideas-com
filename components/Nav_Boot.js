import React, { use, useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Logo from "./Logo";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import NewNav from "./NewNav";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileCard from "./ProfileCard";
import FirestoreService from "../utils/FirestoreService";
import style1 from "../styles/ProfileCard.module.css";
import { MDBSpinner } from "mdb-react-ui-kit";

const Nav_Boot = () => {
  const { user, logout } = useAuth();
  const [sideBar, setSideBar] = useState(false);
  const router = useRouter();
  const [pfData, setPfData] = useState({
    name: "",
    img: "https://freesvg.org/img/abstract-user-flat-4.png",
  });
  const [showProfileCard, setShowProfileCard] = useState(false);

  /* --------------------------- handleProfilesCard --------------------------- */
  const handleProfilesCard = () => {
    setShowProfileCard(!showProfileCard);
  };

  useEffect(() => {
    if (user !== null) {
      const getPfData = async () => {
        return new Promise(async (resolve, reject) => {
          await FirestoreService.getProfileInfo(user.email)
            .then((response) => {
              setPfData({
                ...pfData,
                name: response._delegate._snapshot.docChanges[0].doc.data.value
                  .mapValue.fields.displayName.stringValue,
                img: response._delegate._snapshot.docChanges[0].doc.data.value
                  .mapValue.fields.img.stringValue,
              });
            })
            .then(() => {
              resolve();
            })
            .catch((e) => {
              reject(e);
            });
        });
      };
      getPfData().then(() => {});
    }
  }, []);

  return (
    <>
      {sideBar && (
        <>
          <div>
            <NewNav name={pfData.name} img={pfData.img} />
            <span
              style={{
                color: "white",
                padding: "3px",
                right: "0",
                position: "fixed",
                backgroundColor: "#36225d",
                zIndex: "4",
              }}
              onClick={() => {
                setSideBar(false);
                setShowProfileCard(false);
              }}
            >
              <MenuIcon sx={{ fontSize: 40 }} />
            </span>
          </div>
        </>
      )}

      <div
        className="z-3 position-fixed w-100 shadow"
        style={{ backgroundColor: "#4a2f80", zIndex: "3" }}
      >
        <header className="d-flex flex-wrap justify-content-center py-1  border-bottom align-items-center ">
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none justify-content-center  rounded "
          >
            <Logo />
          </a>

          <ul className="nav nav-pills">
            <li className="nav-item">
              {user ? (
                <div className="d-flex" style={{ cursor: "pointer" }}>
                  <a
                    className="p-2 rounded hoverbutton  ms-3 mt-1 d-flex align-items-center justify-content-center "
                    onClick={handleProfilesCard}
                  >
                    <img
                      src={
                        pfData.img
                          ? pfData.img
                          : "https://freesvg.org/img/abstract-user-flat-4.png"
                      }
                      alt=""
                      width="32"
                      height="32"
                      className="rounded-circle me-2 me-2 m-1 bg-light"
                      style={{ objectFit: "cover" }}
                    />
                    <h5 className="text-light">
                      {pfData.name === "" ? (
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
                        <>{pfData.name}</>
                      )}
                    </h5>
                  </a>
                  <a className="p-2 rounded  ms-3 mt-1 d-flex align-items-center justify-content-center  hoverbutton">
                    <h5
                      className="text-light"
                      onClick={() => {
                        logout();
                        router.push("/login");
                      }}
                    >
                      Logout
                    </h5>
                  </a>
                  <a
                    className=" p-2 rounded hoverbutton  ms-3 mt-1 d-flex"
                    style={{ color: "balck" }}
                    onClick={() => {
                      setSideBar(true);
                    }}
                  >
                    <MenuIcon className="text-light" sx={{ fontSize: 40 }} />
                  </a>
                </div>
              ) : (
                <>
                  <div className="d-flex">
                    <a
                      href="/register"
                      className="p-2  rounded  me-3 mt-1 d-flex align-items-center justify-content-center  hoverbutton"
                    >
                      <h5>Register</h5>
                    </a>
                    <a
                      href="/login"
                      className="p-2 rounded  me-3 mt-1 d-flex align-items-center justify-content-center  hoverbutton"
                    >
                      <h5>Login</h5>
                    </a>
                    <a
                      className="p-2 rounded  me-3 mt-1 d-flex align-items-center justify-content-center 
                      text-center hoverbutton text-white"
                      onClick={() => {
                        setShowProfileCard(false);
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
      <div className={style1.navPlace}></div>
      {showProfileCard && !sideBar && (
        <div
          className="d-flex align-items-center justify-content-center "
          style={{ zIndex: "5" }}
        >
          <ProfileCard
            handleProfilesCard={handleProfilesCard}
            name={pfData.name}
            img={pfData.img}
          />
        </div>
      )}
    </>
  );
};

export default Nav_Boot;
