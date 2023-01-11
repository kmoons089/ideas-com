import React from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "./Logo";

const Nav_Boot = () => {
  return (
    <>
      <div class="z-3 ">
        <header class="d-flex flex-wrap justify-content-center py-1  border-bottom ">
          <a
            href="/"
            class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
          >
            <span class="fs-4">
              <Logo />
            </span>
          </a>

          <ul class="nav nav-pills">
            <li class="nav-item">
              <a href="/" class="btn btn-dark  ms-3" aria-current="page">
                <h5>Home</h5>
              </a>
            </li>
            <li class="nav-item">
              <a href="/about" class="btn btn-dark  ms-3">
                <h5>About</h5>
              </a>
            </li>
            <li class="nav-item">
              <a href="/html" class="btn btn-dark  ms-3">
                <h5>Html</h5>
              </a>
            </li>
            <li class="nav-item">
              <a href="/java" class="btn btn-dark  ms-3">
                <h5>Java</h5>
              </a>
            </li>
            <li class="nav-item">
              <a href="/pp" class="btn btn-dark  ms-3">
                <h5>PowerPoint</h5>
              </a>
            </li>
            <li class="nav-item">
              <a href="/hw" class="btn btn-dark ms-3">
                <h5>Hardware</h5>
              </a>
            </li>
          </ul>
        </header>
      </div>
    </>
  );
};

export default Nav_Boot;
