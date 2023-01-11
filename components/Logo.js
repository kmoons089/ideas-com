import style from "../styles/logo.module.css";

import logo3 from "../public/img/logo.png";
import Image from "next/image";

const Logo = () => {
  return (
    <div className={style.logo}>
      <Image src={logo3} className={style.img} />
      <h4>WEDONTWANNATHINK</h4>
    </div>
  );
};

export default Logo;
