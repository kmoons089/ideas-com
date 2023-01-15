import Meta from "../components/Meta";

import Footer from "../components/Footer";

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
