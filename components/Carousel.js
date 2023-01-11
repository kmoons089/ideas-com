import React from "react";
import Carousel from "react-bootstrap/Carousel";
import landing_page from "../public/img/slide1.jpg";
import landing_page1 from "../public/img/landingPage1.svg";
import landing_page2 from "../public/img/landingPage2.svg";
import landing_page3 from "../public/img/landingPage3.svg";
import Image from "next/image";
import { Container } from "react-bootstrap";

const Carousel_Component = () => {
  return (
    <>
      <Container>
        <Carousel>
          <Carousel.Item>
            <Image
              className="d-block w-100 h-auto"
              src={landing_page1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block w-100 h-auto"
              src={landing_page2}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block w-100 h-auto"
              src={landing_page3}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </Container>
    </>
  );
};

export default Carousel_Component;
