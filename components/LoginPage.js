import axios from "axios";
import Router from "next/router";
import Link from "next/link";

class LoginPage extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
  }

  onSubmitHandler = async e => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "POST",
        url: "https://amzreviewserver.herokuapp.com/api/v1/users/login",
        data: {
          email: this.state.email,
          password: this.state.password
        }
      });

      document.cookie = `jwt=${res.data.token}`;

      if (res.data.status === "success") {
        window.setTimeout(() => {
          Router.push(`/me`);
        }, 500);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  render() {
    return (
      <main className="main">
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
          <form>
            <div className="form__group">
              <label className="form__label" htmlFor="email">
                Email address
              </label>
              <input
                onChange={e => this.setState({ email: e.target.value })}
                className="form__input"
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="password">
                Password
              </label>
              <input
                onChange={e => this.setState({ password: e.target.value })}
                className="form__input"
                id="password"
                type="password"
                placeholder="••••••••"
                required
                minLength="8"
              />
            </div>
            <div className="form__group space-between">
              <button
                onClick={this.onSubmitHandler}
                className="btn btn--primary"
              >
                Login
              </button>
              <Link href="/forgotPassword">
                <a className="text-link">Forgot my password</a>
              </Link>
            </div>
          </form>
        </div>
      </main>
    );
  }
}

export default LoginPage;
