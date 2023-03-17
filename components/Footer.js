import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const Footer = () => {
  return (
    <>
      <footer className="text-center text-lg-start bg-white text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block"></div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3 text-secondary"></i>
                  WEDONTWANNATHINK
                </h6>
                <p>
                  The best and most beautiful things in the world cannot be seen
                  or even touched — they must be felt with the heart. -Helen
                  Keller
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Projects</h6>
                <p>
                  <a href="/html" className="text-reset">
                    Html
                  </a>
                </p>
                <p>
                  <a href="/java" className="text-reset">
                    Java
                  </a>
                </p>
                <p>
                  <a href="/pp" className="text-reset">
                    PowerPoint
                  </a>
                </p>
                <p>
                  <a href="/hw" className="text-reset">
                    Hardware
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <LocationOnIcon />
                  Kan Lan, Taungoo
                </p>
                <p>
                  <EmailIcon />
                  wedontwannathink@gmail.com
                </p>
                <p>
                  <LocalPhoneIcon />
                  09 123456789
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Developers</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Kyaw Gyi
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Aung Gyi
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Wint Maing
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Cow Gyi
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center p-4">
          © 2023 Copyright:
          <a className="text-reset fw-bold" href="https://wedontwannathink.com">
            wedontwannathink.com
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
