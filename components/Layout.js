import Nav from "./Nav";
import Meta from "./Meta";

import styles from "../styles/Layout.module.css";
import Nav_Boot from "./Nav_Boot";
import NewNav from "./NewNav";

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Nav_Boot />
      <div>
        <main>{children}</main>
      </div>
      <script src="./wow.min.js"></script>
      <script>new WOW().init();</script>
      <script src="../jsfiles/ratingStar.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    </>
  );
};

export default Layout;
