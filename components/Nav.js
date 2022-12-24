import Link from "next/link";
import { useState, useEffect } from "react";
import navStyles from "../styles/Nav.module.css";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ExtensionIcon from "@mui/icons-material/Extension";
import Logo from "./Logo";
import router from "next/router";

const Nav = () => {
  const [menu, setMenu] = useState(false);

  const MenuHandler = () => {
    setMenu(!menu);
  };

  useEffect(() => {}, []);

  return (
    <nav className={navStyles.nav}>
      <div
        style={{ cursor: "pointer" }}
        className={navStyles.logo}
        onClick={() => {
          router.push("/", null, { shallow: false });
        }}
      >
        <Logo />
      </div>

      <ul className={navStyles.menuOff}>
        {/* <ul className={navStyles.menuOff}> */}
        <li
          onClick={() => {
            router.push("/", null, { shallow: false });
          }}
        >
          <HomeIcon />
          <Link href="/">HOME</Link>
        </li>
        <li
          onClick={() => {
            router.push("/about", null, { shallow: false });
          }}
        >
          <InfoIcon />
          <Link href="/about">ABOUT</Link>
        </li>

        <Button
          className={navStyles.menu}
          variant="outlined"
          color="warning"
          onClick={MenuHandler}
        >
          <MenuIcon />
          MENU
        </Button>
        <ul className={menu ? navStyles.menuOn : navStyles.menuOff2}>
          <li
            onClick={() => {
              router.push("/", null, { shallow: false });
            }}
          >
            <HomeIcon />
            <Link href="/">HOME</Link>
          </li>
          <li
            onClick={() => {
              router.push("/about", null, { shallow: false });
            }}
          >
            <InfoIcon />
            <Link href="/about">ABOUT</Link>
          </li>
          <li
            onClick={() => {
              router.push("/html", null, { shallow: true });
            }}
          >
            <ExtensionIcon />
            <Link href="/html">HTML </Link>
          </li>
          <li
            onClick={() => {
              router.push("/java", null, { shallow: true });
            }}
          >
            <ExtensionIcon />
            <Link href="/java">JAVA </Link>
          </li>
          <li
            onClick={() => {
              router.push("/pp", null, { shallow: true });
            }}
          >
            <ExtensionIcon />
            <Link href="/pp">POWERPOINT </Link>
          </li>
          <li
            onClick={() => {
              router.push("/hw", null, { shallow: true });
            }}
          >
            <ExtensionIcon />
            <Link href="/hw">HARDWARE </Link>
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export default Nav;
