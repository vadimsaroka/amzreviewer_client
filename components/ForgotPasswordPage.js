import axios from "axios";
import Router from "next/router";

class ForgotPassportPage extends React.Component {
  constructor() {
    super();

    this.state = {
      email: ""
    };
  }

  onSubmitHandler = async e => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "POST",
        url:
          "https://amzreviewserver.herokuapp.com/api/v1/users/forgotPassword",
        data: {
          email: this.state.email
        }
      });

      if (res.data.status === "success") {
        window.setTimeout(() => {
          Router.push(`/`);
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
          <h2 className="heading-secondary ma-bt-lg">Forgot password</h2>
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
            <div className="form__group">
              <button onClick={this.onSubmitHandler} className="btn btn--green">
                Send
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }
}

export default ForgotPassportPage;
