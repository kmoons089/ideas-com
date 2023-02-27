import React from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import style from "../styles/ProfileCard.module.css";

const ProfileCard = ({ handleProfilesCard, name, img }) => {
  const auth = useAuth();
  return (
    <>
      <div className={style.profileCard}>
        <div className="card shadow">
          <div className="card-header">Your Account</div>
          <div className="card-body d-flex align-items-center justify-content-center p-3">
            <img
              src={
                img ? img : "https://freesvg.org/img/abstract-user-flat-4.png"
              }
              alt=""
              style={{
                width: "90px",
                height: "90px",
                objectFit: "cover",
              }}
              className="rounded-circle "
            />
            <div className="card-body text-center">
              <h5 className="card-title">{name}</h5>
              <p className="card-text text-muted">{auth.user.email}</p>
              <a
                href="/profile"
                className="btn "
                style={{
                  backgroundColor: "#6741b3",
                  border: "none",
                  color: "white",
                }}
              >
                Manage Account
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
