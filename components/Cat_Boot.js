import React from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Ratio from "react-bootstrap/Ratio";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import html from "../public/img/htmllogo.png";
import java from "../public/img/javalogo.png";
import pp from "../public/img/pplogo.png";
import ct from "../public/img/ctlogo.png";

const Cat_Boot = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Ratio aspectRatio={"1x1"}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Ratio>
          </Col>
          <Col>2 of 2</Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
        </Row>
      </Container>
    </>
  );
};

export default Cat_Boot;
