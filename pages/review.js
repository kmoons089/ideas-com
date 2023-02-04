import Meta from "../components/Meta";
import React, { useEffect, useState } from "react";

import ReviewArray from "../components-posts/ReviewArray";
import { Button, Container } from "react-bootstrap";
import { Loader } from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import CreateReview from "../components/CreateReview";

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
          <CreateReview
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

          <CreateReview />

          <ReviewArray mode="add" />
        </>
      )}
    </>
  );
};

export default review;
