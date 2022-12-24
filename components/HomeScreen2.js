import HomeStyle from "../styles/Home.module.css";
import whatisthis from "../public/img/whatisthis.jpg";
import whorwe from "../public/img/whorwe.png";
import Image from "next/image";

const HomeScreen2 = () => {
  return (
    <div className={HomeStyle.homeScreen2}>
      <div className={HomeStyle.grid}>
        <div className={HomeStyle.para}>
          <h1 className="wow animate__animated animate__fadeInUp">
            What is this website ?
          </h1>
          <p className="wow animate__animated animate__fadeInUp">
            This website is technically a blog website. We suggest some project
            ideas , we found on google. we hope this website can help to finish
            your project.
          </p>
        </div>
        <div className={HomeStyle.para}>
          <Image
            src={whatisthis}
            className="wow animate__animated animate__fadeInUp"
          />
        </div>
        <div className={HomeStyle.para}>
          <h1 className="wow animate__animated animate__fadeInUp">
            Who are we ?
          </h1>
          <p className="wow animate__animated animate__fadeInUp">
            We are 2nd year cu students and we made this website as a school
            project.
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

export default HomeScreen2;
