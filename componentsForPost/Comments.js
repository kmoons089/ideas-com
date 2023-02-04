import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/router";
import Link from "next/link";
import FirestoreService from "../utils/FirestoreService";
import FirestoreServiceForPosts from "../utils/FirestoreServiceForPosts";

const Comments = ({ id }) => {
  const route = useRouter();
  const [commetsData, setCommentsData] = useState({
    owner_email: "",
    displayName: "",
    body: "",
    createAt: "",
    cmPf: "",
  });
  const [post_onwer, setPost_owner] = useState({
    displayName: "",
    pfImg: "",
  });

  useEffect(() => {
    const getData = () => {
      console.log(id.stringValue);
      const searchId = id.stringValue;
      if (route.pathname == "/posts/[id]") {
        try {
          FirestoreServiceForPosts.getComment(searchId).then((response) => {
            // console.log(
            //   response._delegate._document.data.value.mapValue.fields
            // );

            const comment =
              response._delegate._document.data.value.mapValue.fields;
            //console.log(comment.body.stringValue);
            setCommentsData({
              ...commetsData,
              owner_email: comment.owner_email.stringValue,
              body: comment.body.stringValue,
              cmPf: comment.pfImg.stringValue,
              displayName: comment.displayName.stringValue,
            });
          });
        } catch (error) {
          console.log("Errors while fetching single comments : " + error);
        }
      } else {
        FirestoreServiceForPosts.getComment(searchId).then((response) => {
          //console.log(response);
          const comment =
            response._delegate._snapshot.docChanges[0].doc.data.value.mapValue
              .fields;
          console.log(comment.body.stringValue);
          setCommentsData({
            ...commetsData,
            owner_email: comment.owner_email.stringValue,
            body: comment.body.stringValue,
            cmPf: comment.cmPf.stringValue,
            displayName: comment.displayName.stringValue,
          });
        });
      }
    };
    getData();
  }, []);

  /* ---------------------------- get profild data ---------------------------- */
  useEffect(() => {
    let email = commetsData.owner_email;
    const getPostOwnerInfo = async () => {
      try {
        await FirestoreService.getProfileInfo(email).then((response) => {
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
  }, [commetsData]);

  useEffect(() => {}, [post_onwer]);

  return (
    <div>
      <MDBCard
        alignment="card border  shadow-0 mb-3 mt-2 p-2"
        className="w-80  rounded"
      >
        <Link
          className="d-flex align-items-center "
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
          <div className="d-flex flex-column  w-75">
            {post_onwer.displayName === "" ? (
              <>
                <p class="placeholder-glow ">
                  <span class="placeholder" style={{ width: "100%" }}></span>
                </p>
              </>
            ) : (
              <>
                <h4 className="mt-3">{post_onwer.displayName}</h4>
              </>
            )}

            {commetsData.owner_email === "" ? (
              <>
                <p class="placeholder-glow ">
                  <span class="placeholder" style={{ width: "100%" }}></span>
                </p>
              </>
            ) : (
              <>
                <p className="text-muted">{commetsData.owner_email}</p>
              </>
            )}
          </div>
        </Link>
        <MDBCardBody>
          {commetsData.body === "" ? (
            <>
              <p class="placeholder-glow ">
                <span class="placeholder" style={{ width: "100%" }}></span>
              </p>
              <p class="placeholder-glow ">
                <span class="placeholder" style={{ width: "100%" }}></span>
              </p>
            </>
          ) : (
            <>
              <p>{commetsData.body}</p>
            </>
          )}
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default Comments;
