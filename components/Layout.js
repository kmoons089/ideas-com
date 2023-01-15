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
    </>
  );
};

export default Layout;
