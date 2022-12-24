import footerStyle from "../styles/footer.module.css";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className={footerStyle.footer}>
      <div className={footerStyle.column}>
        <h1>About Us</h1>
        <p>We are students.</p>
        <div className={footerStyle.logo}>
          <div>
            <Logo />
          </div>
        </div>
      </div>
      <div className={footerStyle.column}>
        <h1>Contact Us</h1>
        <ul>
          <li>09 123456789</li>
          <li>abdcef@gmail.com</li>
          <li>Bo Tauk Road , Bago</li>
          <li>Mon - Sun 24/7 thinkin da bout u</li>
        </ul>
      </div>
      <div className={footerStyle.column}>
        <h1>Our Services</h1>
        <ul>
          <li>You can call us to help your project</li>
          <li>First customer 20% discount</li>
          <li>You need to give us money even if you are nyi ma lay.</li>
        </ul>
      </div>
      <div className={footerStyle.column}>
        <h1>Developers</h1>
        <ul>
          <li>Kyaw Gyi</li>
          <li>Aung Gyi</li>
          <li>Win Naing</li>
          <li>K MOON S</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
