import axios from "axios";
import Router from "next/router";

class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      passwordConfirm: ""
    };
  }

  onSubmitHandler = async e => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "PATCH",
        url: `https://amzreviewserver.herokuapp.com/api/v1/users/resetPassword/${this.props.token}`,
        data: {
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
          <h2 className="heading-secondary ma-bt-lg">Reset password</h2>
          <form>
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
            <div className="form__group">
              <button onClick={this.onSubmitHandler} className="btn btn--green">
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }
}

export default ResetPasswordPage;
