import axios from "axios";
import ReviewPage from "./reviewPage";
import RenderButtons from "./RenderButtons";
import Router from "next/router";
import Link from "next/link";

class ReviewsPage extends React.Component {
  constructor() {
    super();

    this.state = {
      Reviews: null,
      reviewsLength: 0,
      query: "",
      activeButton: "all",
      rerender: false
    };

    this.myRef = React.createRef();
  }

  async componentDidMount() {
    if (!document.cookie.split("=")[1]) {
      return Router.push(`/`);
    }
    this.renderReviews();
  }

  renderReviews = async (status = this.state.activeButton, page = 1) => {
    if (status === "search") return;

    let url =
      status === "all"
        ? (url = `https://amzreviewserver.herokuapp.com/api/v1/reviews/my/reviews/${page}`)
        : (url = `https://amzreviewserver.herokuapp.com/api/v1/reviews/status/${status}/page/${page}`);

    try {
      const res = await axios({
        method: "GET",
        url: url,
        headers: { Authorization: "Bearer " + document.cookie.split("=")[1] }
      });

      if (res.data.status === "success") {
        const reviews = res.data.data.data;

        this.setState({
          reviewsLength: res.data.results,
          totalSpend: res.data.moneySpent,
          rerender: false,
          Reviews: reviews.map(review => {
            return (
              <ReviewPage
                key={review.id}
                review={review}
                img={review.imageCover}
              />
            );
          })
        });
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  activeBtn = b => {
    this.setState({
      rerender: true
    });
    if (b.classList.contains("reviewsList__control")) {
      return;
    }
    const btns = Array.from(document.querySelectorAll(".reviewsList__btn"));

    btns.map(e => {
      if (e.classList.contains("reviewsList__active")) {
        e.classList.remove("reviewsList__active");
      }
    });

    if (!b.classList.contains("reviewsList__form")) {
      b.classList.add("reviewsList__active");
      this.renderReviews(b.id);
      this.setState({
        activeButton: b.id
      });
    }
  };

  searchByName = async e => {
    e.preventDefault();
    e.persist();

    if (this.state.query !== "") {
      try {
        const res = await axios({
          method: "GET",
          url: `https://amzreviewserver.herokuapp.com/api/v1/reviews/find/${this.state.query}`,
          headers: { Authorization: "Bearer " + document.cookie.split("=")[1] }
        });

        if (res.data.status === "success") {
          const reviews = res.data.data.data;

          this.setState({
            reviewsLength: res.data.results,
            query: "",
            totalSpend: res.data.moneySpent,
            Reviews: reviews.map(review => {
              return (
                <ReviewPage
                  key={review.id}
                  review={review}
                  img={review.imageCover}
                />
              );
            })
          });
          this.activeBtn(e.target);
        }
      } catch (err) {
        alert(err.response.data.message);
      }
    }
  };

  onButtonClick = async page => {
    this.renderReviews(this.state.activeButton, page);
  };

  scrollHandler = () => {
    window.scrollTo(0, this.myRef.current.scrollIntoView());
  };

  BtnVisibility = () => {
    if (this.state.reviewsLength > 10) {
      return (
        <RenderButtons
          onButtonClick={this.onButtonClick}
          scrollHandler={this.scrollHandler}
          rerender={this.state.rerender}
        />
      );
    }
  };

  renderInfo = () => {
    if (this.state.reviewsLength > 0) {
      return (
        <div className="reviewsList__reviews">
          <span>Reviews: {this.state.reviewsLength}</span>
          <span>Total: ${this.state.totalSpend}</span>
        </div>
      );
    } else {
      return (
        <div className="reviewsList__reviews">
          <span>Empty</span>
        </div>
      );
    }
  };

  render() {
    return (
      <main ref={this.myRef} className="main">
        <div className="reviewsList">
          <div className="reviewsList__wrapper">
            <div className="reviewsList__search">
              <h2 className="heading-secondary">Your reviews</h2>
              <form id="query" className="reviewsList__form">
                <input
                  type="search"
                  id="search"
                  aria-label="search"
                  className="reviewsList__input"
                  value={this.state.query}
                  placeholder="Search all reviews"
                  onChange={e =>
                    this.setState({
                      query: e.target.value
                    })
                  }
                />
                <button
                  onClick={this.searchByName}
                  className="btn btn--search"
                  id="search"
                >
                  Search
                </button>
              </form>
            </div>
            <div
              onClick={b => this.activeBtn(b.target)}
              className="reviewsList__control"
            >
              <button className="reviewsList__btn reviewsList__active" id="all">
                All
              </button>
              <button className="reviewsList__btn" id="ordered">
                Ordered
              </button>
              <button className="reviewsList__btn" id="delivered">
                Delivered
              </button>
              <button className="reviewsList__btn" id="reviewsent">
                Review sent
              </button>
              <button className="reviewsList__btn" id="reviewgot">
                Review got
              </button>
              <button className="reviewsList__btn" id="paid">
                Paid
              </button>
              <button className="reviewsList__btn" id="sold">
                Sold
              </button>
            </div>
            <div className="reviewsList__nav" >
              <Link href="/statistic" as="/statistic">
                <a>📈 Statistic</a>
              </Link>
              <Link href="/newreview" as="/newreview">
                <a>✎ New review</a>
              </Link>
            </div>
            <div className="reviewsList__container">
              {this.renderInfo()}
              {this.state.Reviews}
            </div>
            <div className="reviewsList__pagination">
              {this.BtnVisibility()}
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default ReviewsPage;
