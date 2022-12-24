import Nav from "./Nav";
import Meta from "./Meta";

import styles from "../styles/Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Nav />
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
      <script src="./wow.min.js"></script>
      <script>new WOW().init();</script>
    </>
  );
};

export default Layout;
