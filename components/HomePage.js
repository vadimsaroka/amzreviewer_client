import Link from "next/link";
import Router from "next/router";

class HomePage extends React.Component {
  componentDidMount() {
    if (document.cookie.split("=")[1]) {
      return Router.push(`/me`);
    }
  }

  render() {
    return (
      <main className="main">
        <div className="user-view">
          <div className="home__wrapper">
            <div className="home">
              <h1>Amazon Review Analysis & Tracking Tool</h1>
              <h3>
                Track your Amazon reviews, status and updates with Amzreviewer.
              </h3>
              <img
                src="static/background.png"
                alt="charts"
                className="home__img"
              />
              <h2>Try now</h2>
              <Link href="/signup">
                <a className="btn btn--primary">Sign up</a>
              </Link>
              <p>
                Already use Amzreviewer?{" "}
                <Link href="login">
                  <a className="text-link">Sign in</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default HomePage;
