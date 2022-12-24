import HomeStyle from "../styles/Home.module.css";
import makima from "../public/img/wallpaper2.png";
import Image from "next/image";

const HomeScreen = () => {
  return (
    <div className={HomeStyle.homeScreen}>
      <Image src={makima} className={HomeStyle.HomeLanding} />
    </div>
  );
};

export default HomeScreen;
