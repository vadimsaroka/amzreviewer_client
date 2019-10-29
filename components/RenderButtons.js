class RenderButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 1, rerender: props };
  }

  UNSAFE_componentWillReceiveProps({ rerender }) {
    if (rerender) {
      this.setState({
        page: 1
      });
    }
  }

  renderBtnCount = count => {
    let currentPage = this.state.page;
    if (currentPage >= 1) {
      if (count === "right") {
        currentPage++;
        this.props.onButtonClick(currentPage);
      }
      if (count === "left") {
        currentPage--;
        this.props.onButtonClick(currentPage);
      }
    }
    this.setState({ page: currentPage });
    this.props.scrollHandler();
  };

  renderBtns = () => {
    if (this.state.page <= 1) {
      return (
        <button
          onClick={() => {
            this.renderBtnCount("right");
          }}
          className="btn btn--primary btn--margin"
        >
          Page {this.state.page + 1} &#9657;
        </button>
      );
    } else {
      return (
        <React.Fragment>
          <button
            onClick={() => {
              this.renderBtnCount("left");
            }}
            className="btn btn--primary btn--margin"
          >
            &#9667; Page {this.state.page - 1}
          </button>
          <button
            onClick={() => {
              this.renderBtnCount("right");
            }}
            className="btn btn--primary btn--margin"
          >
            Page {this.state.page + 1} &#9657;
          </button>
        </React.Fragment>
      );
    }
  };

  render() {
    return <div className="renderBtn">{this.renderBtns()}</div>;
  }
}

export default RenderButtons;
