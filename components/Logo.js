import style from "../styles/logo.module.css";

import logo3 from "../public/img/logo.png";
import Image from "next/image";
import { Container } from "react-bootstrap";

const Logo = () => {
  return (
    <Container className="d-flex text-light align-items-center justify-content-center">
      <Image src={logo3} className={style.img} alt="" />
      <h4 className="mt-1">
        <b>WEDONTWANNATHINK</b>
      </h4>
    </Container>
  );
};

export default Logo;
