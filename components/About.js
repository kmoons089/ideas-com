import HomeStyle from "../styles/Home.module.css";
import whatisthis from "../public/img/vector.png";
import whorwe from "../public/img/vector2.png";
import Image from "next/image";

const About = () => {
  return (
    <div className={HomeStyle.homeScreen2}>
      <div className={HomeStyle.grid}>
        <div className={HomeStyle.para}>
          <h2 className="wow animate__animated animate__fadeInUp">
            Get your project idea within a few minutes
          </h2>
          <p className="wow animate__animated animate__fadeInUp">
            More amazing project ideas are coming soon.
          </p>
        </div>
        <div className={HomeStyle.para}>
          <Image
            src={whatisthis}
            className="wow animate__animated animate__fadeInUp"
          />
        </div>
        <div className={HomeStyle.para}>
          <h2 className="wow animate__animated animate__fadeInUp">
            Do it yourself and save time
          </h2>
          <p className="wow animate__animated animate__fadeInUp">
            We only recommand you what to do , do it by yourself
          </p>
        </div>
        <div className={HomeStyle.para}>
          <Image
            src={whorwe}
            className="wow animate__animated animate__fadeInUp"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
