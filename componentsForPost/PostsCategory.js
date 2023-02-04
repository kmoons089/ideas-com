import React, { useState, useEffect } from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTextArea,
  MDBInput,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import FirestoreService from "../utils/FirestoreService";
import CategoryIcon from "@mui/icons-material/Category";

const PostsCategory = () => {
  const route = useRouter();
  const id = route.query;
  const [showModal, setShowModal] = useState(false);
  const [varyingModal, setVaryingModal] = useState(true);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div
      style={{ zIndex: "2", width: "200px" }}
      className="position-fixed bottom-0 end-0 m-5  d-flex align-items-end flex-column "
    >
      {showModal && (
        <>
          <div className="shadow-sm rounded">
            <ul className="list-group" style={{ cursor: "pointer" }}>
              <li
                className="list-group-item "
                onClick={() => {
                  route.push(`/posts/categories/${"all"}`);
                }}
                style={
                  id.id === "all"
                    ? {
                        backgroundColor: "#ffbb01",
                        color: "white",
                      }
                    : {}
                }
              >
                All
              </li>

              <li
                className="list-group-item border "
                onClick={() => {
                  route.push(`/posts/categories/${"html"}`);
                }}
                style={
                  id.id === "html"
                    ? {
                        backgroundColor: "#ffbb01",
                        color: "white",
                      }
                    : {}
                }
              >
                Html
              </li>
              <li
                className="list-group-item border"
                onClick={() => {
                  route.push(`/posts/categories/${"java"}`);
                }}
                style={
                  id.id === "java"
                    ? {
                        backgroundColor: "#ffbb01",
                        color: "white",
                      }
                    : {}
                }
              >
                Java
              </li>
              <li
                className="list-group-item border"
                onClick={() => {
                  route.push(`/posts/categories/${"powerpoint"}`);
                }}
                style={
                  id.id === "pp"
                    ? {
                        backgroundColor: "#ffbb01",
                        color: "white",
                      }
                    : {}
                }
              >
                PowerPoint
              </li>
              <li
                className="list-group-item border"
                onClick={() => {
                  route.push(`/posts/categories/${"hardware"}`);
                }}
                style={
                  id.id === "hw"
                    ? {
                        backgroundColor: "#ffbb01",
                        color: "white",
                      }
                    : {}
                }
              >
                Hardware
              </li>
              <li
                className="list-group-item border"
                onClick={() => {
                  route.push(`/posts/categories/${"fun_post"}`);
                }}
                style={
                  id.id === "fun"
                    ? {
                        backgroundColor: "#ffbb01",
                        color: "white",
                      }
                    : {}
                }
              >
                Fun Posts
              </li>
            </ul>
          </div>
        </>
      )}
      <>
        <Button
          className="shadow"
          title="Category"
          onClick={handleModal}
          style={{
            zIndex: "3",
            backgroundColor: "#ffbb01",
            border: "none",
            marginTop: "5px",
          }}
        >
          <CategoryIcon sx={{ fontSize: 40 }} />
        </Button>
      </>
    </div>
  );
};

export default PostsCategory;
