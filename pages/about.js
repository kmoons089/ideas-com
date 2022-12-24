import Meta from "../components/Meta";
import img from "../public/img/about2.png";
import pp from "../public/img/ppmeme4.png";
import styles from "../styles/about.module.css";
import About from "../components/About";
import About2 from "../components/About2";
import Footer from "../components/Footer";
import Image from "next/image";

const about = () => {
  return (
    <>
      <div>
        <Meta title="About" />
        <main className={styles.main}>
          <Image src={img} className={styles.wallpaper} />
        </main>
        <About />
        <div className="wow animate__animated animate__fadeInUp">
          <main className={styles.main}>
            <Image src={pp} className={styles.wallpaper} />
          </main>
        </div>
        <About2 />
      </div>
      <Footer />
    </>
  );
};

export default about;
