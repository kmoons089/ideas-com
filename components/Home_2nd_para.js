import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomeStyle from "../styles/Home.module.css";
import Image from "next/image";
import whatisthis from "../public/img/whatisthis.jpg";
import whorwe from "../public/img/whorwe.png";

const Home_2nd_para = () => {
  return (
    <>
      <Container>
        <Row>
          <Col className="d-flex justify-content-center align-items-center text-center">
            <Container>
              <h1 className="wow animate__animated animate__fadeInUp ">
                What is this website ?
              </h1>
              <p className="wow animate__animated animate__fadeInUp">
                This website is technically a blog website. We suggest some
                project ideas , we found on google. we hope this website can
                help to finish your project.
              </p>
            </Container>
          </Col>
          <Col className="d-flex justify-content-center align-items-center text-center">
            <div className="wow animate__animated animate__fadeInUp ">
              <Image
                src={whatisthis}
                className="w-100 h-auto  d-block"
                alt=""
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center align-items-center text-center">
            <Image
              src={whorwe}
              className="wow animate__animated animate__fadeInUp w-100 h-auto  d-block"
              alt=""
            />
          </Col>
          <Col className="d-flex justify-content-center align-items-center text-center">
            <Container>
              <h1 className="wow animate__animated animate__fadeInUp">
                Who are we ?
              </h1>
              <p className="wow animate__animated animate__fadeInUp">
                We are 2nd year cu students and we made this website as a school
                project.
              </p>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home_2nd_para;
