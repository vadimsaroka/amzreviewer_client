import Link from "next/link";
import axios from "axios";
import Router from "next/router";

import "./Header.scss";

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      jwt: false,
      userName: "",
      userPhoto: ""
    };
  }

  async componentDidMount() {
    // Verify user
    try {
      const res = await axios({
        method: "GET",
        url: `https://amzreviewserver.herokuapp.com/api/v1/users/ferify/${
          document.cookie.split("=")[1]
        }`
      });

      if (res.data.status === "success") {
        this.setState({ jwt: document.cookie.split("=")[1] });
      }
    } catch (err) {
      // alert(err.response.data.message);
      console.log(err);
    }

    this.getUser();
  }

  getUser = async () => {
    // Get current user
    if (this.state.jwt) {
      try {
        const res = await axios({
          method: "GET",
          url: "https://amzreviewserver.herokuapp.com/api/v1/users/me",
          headers: { Authorization: "Bearer " + this.state.jwt }
        });

        this.setState({
          userName: res.data.data.data.name.split(" ")[0],
          userPhoto: res.data.data.data.photo
        });
      } catch (err) {
        alert(err.response.data.message);
      }
    }
  };

  logOut = async () => {
    document.cookie =
      "jwt=logout; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

    window.setTimeout(() => {
      Router.push(`/`);
    }, 500);
  };

  render() {
    if (this.state.jwt) {
      return (
        <header className="header">
          <Link href="/" as="/">
            <a className="header__nav--link">
              <div className="header__logo">
                Amazon Reviewer{" "}
                <img
                  alt="logo"
                  className="header__image"
                  src="static/logo.png"
                />
              </div>
            </a>
          </Link>
          <nav className="header__nav">
            <a onClick={this.logOut} className="header__nav--link">
              Log out
            </a>
            <Link href="/me" as="/me">
              <a className="header__nav--link">
                <img
                  className="header__img"
                  alt="user photo"
                  src={this.state.userPhoto}
                />
                {this.state.userName}
              </a>
            </Link>
          </nav>
        </header>
      );
    } else {
      return (
        <header className="header">
          <Link href="/" as="/">
            <a className="header__nav--link">
              <div className="header__logo">
                Amazon Reviewer{" "}
                <img
                  alt="logo"
                  className="header__image"
                  src="static/logo.png"
                />
              </div>
            </a>
          </Link>
          <nav className="header__nav">
            <Link href="/login" as="/login">
              <a className="header__nav--link" style={{"marginRight": "3rem"}}>Sign in</a>
            </Link>
            <Link href="/signup" as="signup">
              <a className="header__nav--link">Sign up</a>
            </Link>
          </nav>
        </header>
      );
    }
  }
}

export default Header;
