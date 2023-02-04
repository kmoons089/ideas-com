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
        <Row>
          <Col className="d-flex justify-content-center align-items-center text-center">
            <Container>
              <h1 className="wow animate__animated animate__fadeInUp">
                social media
              </h1>
              <p className="wow animate__animated animate__fadeInUp">
                You can also use this website as social media website ,post your
                project screenshot and post about your struggle doing your
                project and post about your feeling
              </p>
            </Container>
          </Col>
          <Col className="d-flex justify-content-center align-items-center text-center">
            <img
              src="https://img.freepik.com/free-vector/modern-online-registration-compositio_23-2147993777.jpg"
              className="wow animate__animated animate__fadeInUp w-75 h-auto  d-block"
              alt=""
            />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center align-items-center text-center">
            <img
              src="https://png.pngtree.com/png-vector/20220925/ourmid/pngtree-a-man-explains-list-of-rule-guidelines-png-image_6212794.png"
              className="wow animate__animated animate__fadeInUp w-75 h-auto  d-block"
              alt=""
            />
          </Col>
          <Col className="d-flex justify-content-center align-items-center text-start">
            <Container>
              <h1 className="wow animate__animated animate__fadeInUp">
                Follow the rules
              </h1>
              <p className="wow animate__animated animate__fadeInUp">
                Rule to follow when you Post
                <ol type="1" className="">
                  <li>In life , the most important is parents</li>
                  <li> Dont forget to brush your teeth.</li>
                  <li>Dont think about her.</li>
                  <li>Wash your hands </li>
                </ol>
                If you dont follow the rules , we will ban your account next
                year.
              </p>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About_2nd_para;
