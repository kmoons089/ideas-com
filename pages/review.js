import Meta from "../components/Meta";
import React, { useEffect, useState } from "react";

import PostsList from "../components-posts/PostsList";
import { Button, Container } from "react-bootstrap";
import { Loader } from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import CreatePost from "../components/CreatePost";

const review = () => {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [varyingModal, setVaryingModal] = useState(false);
  const auth = useAuth();

  /* ------------------------------- handleModal ------------------------------ */
  const handleModal = () => {
    setOpenModal(!openModal);
    setVaryingModal(!varyingModal);
  };

  return (
    <>
      {openModal && !loading && (
        <>
          <CreatePost
            varyingModal={varyingModal}
            handleModal={handleModal}
            mode="add"
            currentPostIdForEdit=""
          />
        </>
      )}
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Meta title="Login" />
          <div
            style={{
              width: "100%",
              minHeight: "100vh",
              position: "fixed",
              top: "0",
              zIndex: -3,
            }}
          ></div>
          <Button
            style={{ zIndex: "2" }}
            className="position-fixed bottom-0 end-0 m-5 btn-lg"
            onClick={handleModal}
          >
            Create Post
          </Button>
          <Container className="w-50">
            <PostsList mode="add" />
          </Container>
        </>
      )}
    </>
  );
};

export default review;
