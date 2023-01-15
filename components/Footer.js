import footerStyle from "../styles/footer.module.css";
import Logo from "./Logo";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Ratio from "react-bootstrap/Ratio";

const Footer = () => {
  return (
    <>
      <div className="bg-warning w-100 mt-5 z-5">
        <div className="container ">
          <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5  border-top">
            <div className="col mb-3">
              <a
                href="/"
                className="d-flex align-items-center mb-3 link-dark text-decoration-none"
              >
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                >
                  <Logo />
                </div>
              </a>
              <p>&copy; 2023</p>
            </div>

            <div className="col mb-3"></div>

            <div className="col mb-3">
              <h5>CONTACT</h5>
              <ul className="nav flex-column">
                <li>09 123456789</li>
                <li>abdcef@gmail.com</li>
                <li>Bo Tauk Road , Bago</li>
                <li>Mon - Sun 24/7 thinkin da bout u</li>
              </ul>
            </div>

            <div className="col mb-3">
              <h5> SERVICES</h5>
              <ul className="nav flex-column">
                <li>You can call us to help your project</li>
                <li>First customer 20% discount</li>
                <li>You need to give us money even if you are nyi ma lay.</li>
              </ul>
            </div>

            <div className="col mb-3">
              <h5>DEVELOPERS</h5>
              <ul className="nav flex-column">
                <li>Kyaw Gyi</li>
                <li>Aung Gyi</li>
                <li>Win Naing</li>
                <li>K MOON S</li>
              </ul>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Footer;
