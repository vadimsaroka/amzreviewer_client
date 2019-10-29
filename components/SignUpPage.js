import axios from "axios";
import Router from "next/router";
import Link from "next/link";

class SignUpPage extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: ""
    };
  }

  onSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios({
        method: "POST",
        url: "https://amzreviewserver.herokuapp.com/api/v1/users/signup",
        data: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          passwordConfirm: this.state.passwordConfirm
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
          <h2 className="heading-secondary ma-bt-lg">Create your account!</h2>
          <form onSubmit={this.onSubmit} className="form form--signup">
            <div className="form__group">
              <label className="form__label" htmlFor="name">
                Your name
              </label>
              <input
                onChange={e => this.setState({ name: e.target.value })}
                className="form__input"
                id="name"
                type="text"
                required
              />
            </div>
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
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="passwordConfirm">
                Confirm password
              </label>
              <input
                onChange={e =>
                  this.setState({ passwordConfirm: e.target.value })
                }
                className="form__input"
                id="passwordConfirm"
                type="password"
                placeholder="••••••••"
                required
                minLength="8"
              />
            </div>
            <div className="form__group space-between">
              <button className="btn btn--primary">Sign up</button>
              <Link href="/login" as="/login">
                <a className="text-link">Already have an account? Sign in</a>
              </Link>
            </div>
          </form>
        </div>
      </main>
    );
  }
}

export default SignUpPage;
