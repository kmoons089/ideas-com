import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomeStyle from "../styles/Home.module.css";
import Image from "next/image";
import whatisthis from "../public/img/whatisthis.jpg";
import whorwe from "../public/img/whorwe.png";
import img1 from "../public/img/whrwe.jpg";
import img2 from "../public/img/vector2.png";
import img3 from "../public/img/vector3.png";
import img4 from "../public/img/vector4.png";

const About_2nd_para = () => {
  return (
    <>
      <Container>
        <Row>
          <Col className="d-flex justify-content-center align-items-center text-center">
            <Container>
              <h2 className="wow animate__animated animate__fadeInUp">
                Get your project idea within a few minutes
              </h2>
              <p className="wow animate__animated animate__fadeInUp">
                More amazing project ideas are coming soon.
              </p>
            </Container>
          </Col>
          <Col className="d-flex justify-content-center align-items-center text-center">
            <div className="wow animate__animated animate__fadeInUp ">
              <Image src={img1} className="w-100 h-auto  d-block" alt="" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center align-items-center text-center">
            <Image
              src={img2}
              className="wow animate__animated animate__fadeInUp w-100 h-auto  d-block"
              alt=""
            />
          </Col>
          <Col className="d-flex justify-content-center align-items-center text-center">
            <Container>
              <h2 className="wow animate__animated animate__fadeInUp">
                Do it yourself and save time
              </h2>
              <p className="wow animate__animated animate__fadeInUp">
                We only recommand you what to do , do it by yourself
              </p>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center align-items-center text-center">
            <Container>
              <h2 className="wow animate__animated animate__fadeInUp">
                Save Time. Save Money. Do it your way.
              </h2>
              <p className="wow animate__animated animate__fadeInUp">
                You can do it.
              </p>
            </Container>
          </Col>
          <Col className="d-flex justify-content-center align-items-center text-center">
            <div className="wow animate__animated animate__fadeInUp ">
              <Image src={img3} className="w-100 h-auto  d-block" alt="" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center align-items-center text-center">
            <Image
              src={img4}
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

export default About_2nd_para;
