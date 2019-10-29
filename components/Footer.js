import Link from "next/link";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="footer__wrapper">
        <Link href="/">
          <a className="footer__nav--link">
            <div className="footer__logo">
              Amazon Reviewer{" "}
              <img alt="logo" className="footer__image" src="static/logo.png" />
            </div>
          </a>
        </Link>
        <div className="footer__right">
          <ul className="footer__nav">
            <Link href="/">
              <li>Home</li>
            </Link>
            <Link href="/about">
              <li>About</li>
            </Link>
            <Link href="/contact">
              <li>Contact</li>
            </Link>
          </ul>
          Copyright &copy; 2019 by Vadim Saroka.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
