import HomeStyle from "../styles/Home.module.css";
import whatisthis from "../public/img/vector3.png";
import meme3 from "../public/img/meme.png";
import meme4 from "../public/img/meme5.png";
import Image from "next/image";

const About2 = () => {
  return (
    <div className={HomeStyle.homeScreen2}>
      <div className={HomeStyle.grid}>
        <div className={HomeStyle.para}>
          <Image
            src={whatisthis}
            className="wow animate__animated animate__fadeInUp"
          />
        </div>
        <div className={HomeStyle.para}>
          <h2 className="wow animate__animated animate__fadeInUp">
            Save Time. Save Money. Do it your way.
          </h2>
          <p className="wow animate__animated animate__fadeInUp">
            You can do it.
          </p>
        </div>

        <div className={HomeStyle.para}>
          <Image
            src={meme3}
            className="wow animate__animated animate__fadeInUp"
          />
        </div>
        <div className={HomeStyle.para}>
          <Image
            src={meme4}
            className="wow animate__animated animate__fadeInUp"
          />
        </div>
      </div>
    </div>
  );
};

export default About2;
