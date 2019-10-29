import axios from "axios";
import Router from "next/router";

class EditReviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: "",
      price: null,
      orderNumber: "",
      orderDate: null,
      groupName: "",
      status: "",
      sold: null,
      gotMoney: null,
      selectedFile: null
    };
  }

  async componentDidMount() {
    if (!document.cookie.split("=")[1]) {
      return Router.push(`/`);
    }
    this.getUserReview();
  }

  getUserReview = async () => {
    // Get current user
    try {
      const res = await axios({
        method: "GET",
        url: `https://amzreviewserver.herokuapp.com/api/v1/reviews/my/${this.props.id}`,
        headers: { Authorization: "Bearer " + document.cookie.split("=")[1] }
      });

      if (res.data.status === "success") {
        this.setState({
          productName: res.data.data.data.name,
          price: res.data.data.data.price,
          orderNumber: res.data.data.data.orderNumber,
          orderDate: new Date(res.data.data.data.orderDate)
            .toLocaleString()
            .split(",")[0],
          groupName: res.data.data.data.groupName,
          status: res.data.data.data.status,
          sold: res.data.data.data.sold,
          gotMoney: res.data.data.data.gotMoney,
          imageCover: res.data.data.data.imageCover,
          selectedFile: res.data.data.data.imageCover
        });
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  onSubmit = async e => {
    e.preventDefault();

    const date = new Date(this.state.orderDate);
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    let formData = new FormData();

    formData.append("name", this.state.productName);
    formData.append("price", this.state.price);
    formData.append("orderNumber", this.state.orderNumber);
    formData.append("orderDate", date);
    formData.append("groupName", this.state.groupName);
    formData.append("status", this.state.status);
    formData.append("sold", this.state.sold);
    formData.append("gotMoney", this.state.gotMoney);
    formData.append("imageCover", this.state.selectedFile);

    try {
      const res = await axios({
        method: "PATCH",
        url: `https://amzreviewserver.herokuapp.com/api/v1/reviews/my/${this.props.id}`,
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

  onDelete = async () => {
    try {
      await axios({
        method: "DELETE",
        url: `https://amzreviewserver.herokuapp.com/api/v1/reviews/my/${this.props.id}`,
        headers: { Authorization: "Bearer " + document.cookie.split("=")[1] }
      });

      window.setTimeout(() => {
        Router.push(`/reviews`);
      }, 500);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  render() {
    return (
      <main className="main">
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Edit Review</h2>
          <form className="form form--signup">
            <div className="form__group form__photo-upload">
              <img
                className="form__review-photo"
                src={this.state.imageCover}
                alt="review photo"
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
            <div className="form__group">
              <label className="form__label" htmlFor="name">
                Product name
              </label>
              <input
                onChange={e => this.setState({ productName: e.target.value })}
                className="form__input"
                id="name"
                type="text"
                required
                minLength="10"
                maxLength="200"
                defaultValue={this.state.productName}
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="price">
                Price $
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
                defaultValue={this.state.price}
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="orderNumber">
                Order number
              </label>
              <input
                onChange={e => this.setState({ orderNumber: e.target.value })}
                className="form__input"
                id="orderNumber"
                required
                defaultValue={this.state.orderNumber}
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="orderDate">
                Order Date
              </label>
              <input
                onChange={e => {
                  this.setState({ orderDate: e.target.value });
                }}
                className="form__input"
                id="orderDate"
                required
                defaultValue={this.state.orderDate}
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="groupName">
                Group name
              </label>
              <input
                onChange={e => this.setState({ groupName: e.target.value })}
                className="form__input"
                id="groupName"
                type="text"
                required
                defaultValue={this.state.groupName}
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
                defaultValue={this.state.sold}
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
                defaultValue={this.state.gotMoney}
              />
            </div>
            <div className="form__group space-between">
              <button onClick={this.onSubmit} className="btn btn--green">
                Save
              </button>
              <button
                onClick={e => {
                  e.preventDefault();
                  if (
                    confirm("Are you sure you want to delete this review?") ===
                    true
                  ) {
                    this.onDelete();
                  }
                }}
                className="btn btn--red"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }
}

export default EditReviewPage;
