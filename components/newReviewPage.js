import axios from "axios";
import Router from "next/router";

class NewReviewPage extends React.Component {
  constructor() {
    super();

    this.state = {
      productName: "",
      price: null,
      orderNumber: "",
      orderDate: null,
      groupName: "",
      status: "ordered",
      sold: 0,
      gotMoney: 0,
      selectedFile:
        "https://amzreviewserver.herokuapp.com/api/v1/reviews/photo/default-review.jpeg"
    };
  }

  async componentDidMount() {
    if (!document.cookie.split("=")[1]) {
      return Router.push(`/`);
    }
  }

  onSubmit = async e => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("name", this.state.productName);
    formData.append("price", this.state.price);
    formData.append("orderNumber", this.state.orderNumber);
    formData.append("orderDate", this.state.orderDate);
    formData.append("groupName", this.state.groupName);
    formData.append("status", this.state.status);
    formData.append("sold", this.state.sold);
    formData.append("gotMoney", this.state.gotMoney);
    formData.append("imageCover", this.state.selectedFile);

    try {
      const res = await axios({
        method: "POST",
        url: "https://amzreviewserver.herokuapp.com/api/v1/reviews/my/reviews",
        headers: { Authorization: "Bearer " + document.cookie.split("=")[1] },
        data: formData
      });

      if (res.data.status === "success") {
        window.setTimeout(() => {
          Router.push(`/reviews`);
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
          <h2 className="heading-secondary ma-bt-lg">Create new Review</h2>
          <form onSubmit={this.onSubmit} className="form form--signup">
            <div className="form__group form__photo-upload">
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
              <label htmlFor="photo">Choose a photo</label>
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="name">
                Product name *
              </label>
              <input
                onChange={e => this.setState({ productName: e.target.value })}
                className="form__input"
                id="name"
                type="text"
                required
                autoFocus
                minLength="10"
                maxLength="200"
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="price">
                Price $ *
              </label>
              <input
                onChange={e => this.setState({ price: e.target.value })}
                className="form__input"
                id="price"
                type="number"
                min="1"
                step="0.01"
                max="10000"
                required
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="orderNumber">
                Order number *
              </label>
              <input
                onChange={e => this.setState({ orderNumber: e.target.value })}
                className="form__input"
                id="orderNumber"
                required
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="orderDate">
                Order Date *
              </label>
              <input
                onChange={e => {
                  const date = new Date(e.target.value);
                  date.setTime(
                    date.getTime() + date.getTimezoneOffset() * 60 * 1000
                  );
                  this.setState({
                    orderDate: date
                  });
                }}
                className="form__input"
                id="orderDate"
                type="date"
                required
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="groupName">
                Group name *
              </label>
              <input
                onChange={e => this.setState({ groupName: e.target.value })}
                className="form__input"
                id="groupName"
                type="text"
                required
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="groupName">
                Status
              </label>
              <select
                onChange={e => this.setState({ status: e.target.value })}
                className="form__input"
                id="groupName"
              >
                <option value={this.state.status}></option>
                <option value="ordered">Ordered</option>
                <option value="delivered">Delivered</option>
                <option value="reviewsent">Review sent</option>
                <option value="reviewgot">Review got</option>
                <option value="paid">Paid</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="groupName">
                Sold
              </label>
              <input
                onChange={e => this.setState({ sold: e.target.value })}
                className="form__input"
                id="groupName"
                type="number"
                min="0"
                step="0.01"
                max="10000"
                placeholder="0"
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="groupName">
                Got Money
              </label>
              <input
                onChange={e => this.setState({ gotMoney: e.target.value })}
                className="form__input"
                id="groupName"
                type="number"
                min="0"
                step="0.01"
                max="10000"
                placeholder="0"
              />
            </div>
            <div className="form__group space-between">
              <button className="btn btn--primary">Create</button>
            </div>
          </form>
        </div>
      </main>
    );
  }
}

export default NewReviewPage;
