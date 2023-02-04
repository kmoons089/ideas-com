import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FirestoreService from "../utils/FirestoreService";
import {
  MDBCard,
  MDBModalDialog,
  MDBModalContent,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTextArea,
  MDBInput,
  MDBSpinner,
} from "mdb-react-ui-kit";
import Link from "next/link";

const LikedProfile = ({ email }) => {
  const auth = useAuth();
  const [data, setData] = useState({
    pfImg: "",
    displayName: "",
    owner_email: "",
  });
  const [post_onwer, setPost_owner] = useState({
    displayName: "",
    pfImg: "",
  });

  useEffect(() => {
    //console.log(email.stringValue);
    setData({ ...data, owner_email: email.stringValue });
    const getData = async () => {
      await FirestoreService.getProfileInfo(email.stringValue).then(
        (response) => {
          console.log(response);
          setData({
            ...data,
            displayName:
              response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
                .fields.displayName.stringValue,
            owner_email:
              response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
                .fields.owner_email.stringValue,
            pfImg:
              response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
                .fields.img.stringValue,
          });
        }
      );
    };
    getData();
  }, []);

  /* ---------------------------- get profild data ---------------------------- */
  useEffect(() => {
    let search_email = data.owner_email;
    const getPostOwnerInfo = async () => {
      try {
        await FirestoreService.getProfileInfo(search_email).then((response) => {
          console.log(
            response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
              .fields
          );
          setPost_owner({
            ...post_onwer,
            displayName:
              response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
                .fields.displayName.stringValue,
            pfImg:
              response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
                .fields.img.stringValue,
          });
        });
      } catch (error) {
        console.log(error);
      }
    };
    getPostOwnerInfo();
  }, [data]);

  useEffect(() => {}, [data]);
  return (
    <div>
      <MDBCard
        alignment="card border  shadow-0 mb-3 mt-2 p-2"
        className="w-80  rounded "
      >
        <Link
          className=" d-flex  align-items-center justify-content-between"
          href="#"
          // href={{
          //   pathname:
          //     article.doc.data.value.mapValue.fields.owner_email
          //       .stringValue == auth.user.email
          //       ? "/profile"
          //       : "/unknown_profile",
          //   query: {
          //     data: article.doc.data.value.mapValue.fields.owner_email
          //       .stringValue,
          //   },
          // }}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="d-flex align-items-center">
            <img
              src={
                post_onwer.pfImg
                  ? post_onwer.pfImg
                  : "https://freesvg.org/img/abstract-user-flat-4.png"
              }
              alt=""
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "10px",
              }}
            />
            <div className="d-flex flex-column ">
              {data.displayName === "" ? (
                <>
                  <p class="placeholder-glow ">
                    <span class="placeholder" style={{ width: "100%" }}></span>
                  </p>
                </>
              ) : (
                <>
                  <h4 className="mt-3">{data.displayName}</h4>
                </>
              )}

              {data.owner_email === "" ? (
                <>
                  <p class="placeholder-glow ">
                    <span class="placeholder" style={{ width: "100%" }}></span>
                  </p>
                </>
              ) : (
                <>
                  <p className="text-muted">{data.owner_email}</p>
                </>
              )}
            </div>
          </div>

          <FavoriteIcon sx={{ fontSize: 40 }} style={{ color: "red" }} />
        </Link>
      </MDBCard>
    </div>
  );
};

export default LikedProfile;
