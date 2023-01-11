import Meta from "../components/Meta";
import img from "../public/img/about2.png";
import pp from "../public/img/ppmeme4.png";
import styles from "../styles/about.module.css";
import About from "../components/About";
import About2 from "../components/About2";
import Footer from "../components/Footer";
import Image from "next/image";
import Carousel_Component from "../components/Carousel";
import About_2nd_para from "../components/About_2nd_para";

const about = () => {
  return (
    <div>
      <Meta title="About" />
      <Carousel_Component />
      <About_2nd_para />
      <Footer />
    </div>
  );
};

export default about;
