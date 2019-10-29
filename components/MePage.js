import axios from "axios";
import Link from "next/link";
import Router from "next/router";

class MePage extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      userPhoto: "",
      selectedFile: null,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    };
  }

  async componentDidMount() {
    if (!document.cookie.split("=")[1]) {
      return Router.push(`/`);
    }
    this.getUser();
  }

  getUser = async () => {
    // Get current user
    try {
      const res = await axios({
        method: "GET",
        url: "https://amzreviewserver.herokuapp.com/api/v1/users/me",
        headers: { Authorization: "Bearer " + document.cookie.split("=")[1] }
      });

      if (res.data.status === "success") {
        this.setState({
          name: res.data.data.data.name,
          userPhoto: res.data.data.data.photo,
          email: res.data.data.data.email
        });
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  onSubmit = async e => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("name", this.state.name);
    formData.append("email", this.state.email);
    formData.append("imageCover", this.state.selectedFile);

    try {
      const res = await axios({
        method: "PATCH",
        url: "https://amzreviewserver.herokuapp.com/api/v1/users/updateMe",
        headers: { Authorization: "Bearer " + document.cookie.split("=")[1] },
        data: formData
      });

      if (res.data.status === "success") {
        window.setTimeout(() => {
          Router.push("/me");
        }, 500);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  onPasswordChange = async e => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "PATCH",
        url:
          "https://amzreviewserver.herokuapp.com/api/v1/users/updateMyPassword",
        headers: { Authorization: "Bearer " + document.cookie.split("=")[1] },
        data: {
          passwordCurrent: this.state.currentPassword,
          password: this.state.newPassword,
          passwordConfirm: this.state.confirmPassword
        }
      });

      if (res.data.status === "success") {
        window.setTimeout(() => {
          Router.push("/login");
        }, 500);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  onDelete = async e => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete your account?") === true) {
      try {
        const res = await axios({
          method: "DELETE",
          url: "https://amzreviewserver.herokuapp.com/api/v1/users/deleteMe",
          headers: { Authorization: "Bearer " + document.cookie.split("=")[1] }
        });

        document.cookie =
          "jwt=logout; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        window.setTimeout(() => {
          Router.push(`/signup`);
        }, 500);
      } catch (err) {
        alert(err.response.data.message);
      }
    }
  };

  render() {
    return (
      <main className="main">
        <div className="user-view">
          <nav className="user-view__menu">
            <ul className="side-nav">
              <li>
                <Link href="/statistic" as="/statistic">
                  <a>📈 Statistic</a>
                </Link>
              </li>
              <li>
                <Link href="/reviews" as="/reviews">
                  <a>☆ My reviews</a>
                </Link>
              </li>
              <li>
                <Link href="/newreview" as="/newreview">
                  <a>✎ New review</a>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="user-view__content">
            <div className="user-view__form-container">
              <h2 className="heading-secondary ma-bt-md">
                Your account settings
              </h2>
              <form className="form form-user-data">
                <div className="form__group">
                  <label className="form__label" htmlFor="name">
                    Name
                  </label>
                  <input
                    onChange={e => this.setState({ name: e.target.value })}
                    className="form__input"
                    id="name"
                    name="name"
                    type="text"
                    required
                    defaultValue={this.state.name}
                  />
                </div>
                <div className="form__group ma-bt-md">
                  <label className="form__label" htmlFor="email">
                    Email address
                  </label>
                  <input
                    onChange={e => this.setState({ email: e.target.value })}
                    className="form__input"
                    id="email"
                    type="email"
                    name="email"
                    required
                    defaultValue={this.state.email}
                  />
                </div>
                <div className="form__group form__photo-upload">
                  <img
                    className="form__user-photo"
                    src={this.state.userPhoto}
                    alt="user photo"
                  />
                  <input
                    onChange={e =>
                      this.setState({ selectedFile: e.target.files[0] })
                    }
                    className="form__upload"
                    type="file"
                    accept="image/*"
                    id="photo"
                    name="photo"
                  />
                  <label htmlFor="photo">Choose new photo</label>
                </div>
                <div className="form__group right">
                  <button onClick={this.onSubmit} className="btn btn--primary">
                    Save settings
                  </button>
                </div>
              </form>
            </div>
            <div className="line">&nbsp;</div>
            <div className="user-view__form-container">
              <h2 className="heading-secondary ma-bt-md">Password change</h2>
              <form className="form form-user-password">
                <div className="form__group">
                  <label className="form__label" htmlFor="password-current">
                    Current password
                  </label>
                  <input
                    onChange={e =>
                      this.setState({ currentPassword: e.target.value })
                    }
                    className="form__input"
                    type="password"
                    required
                    placeholder="••••••••"
                    minLength="8"
                    id="password-current"
                  />
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="password">
                    New password
                  </label>
                  <input
                    onChange={e =>
                      this.setState({ newPassword: e.target.value })
                    }
                    className="form__input"
                    type="password"
                    required
                    placeholder="••••••••"
                    minLength="8"
                    id="password"
                  />
                </div>
                <div className="form__group ma-bt-lg">
                  <label className="form__label" htmlFor="password-confirm">
                    Confirm password
                  </label>
                  <input
                    onChange={e =>
                      this.setState({ confirmPassword: e.target.value })
                    }
                    className="form__input"
                    type="password"
                    required
                    placeholder="••••••••"
                    minLength="8"
                    id="password-confirm"
                  />
                </div>
                <div className="form__group right">
                  <button
                    onClick={this.onPasswordChange}
                    className="btn btn--primary"
                  >
                    Save password
                  </button>
                </div>
              </form>
            </div>
            <div className="line">&nbsp;</div>
            <div className="user-view__form-container">
              <div className="user-view__delete">
                <h2 className="form__label">
                  Deleting your account is irreversible
                </h2>
                <button onClick={this.onDelete} className="btn btn--red">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default MePage;
