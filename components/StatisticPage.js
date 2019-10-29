import Chart from "chart.js";
import axios from "axios";
import Router from "next/router";

class StatisticPage extends React.Component {
  constructor() {
    super();
    this.state = {
      reviews: null,
      fee: null,
      result: null,
      moneySpent: null
    };
  }

  async componentDidMount() {
    if (!document.cookie.split("=")[1]) {
      return Router.push(`/`);
    }
    try {
      const res = await axios({
        method: "GET",
        url: "https://amzreviewserver.herokuapp.com/api/v1/reviews/statistic",
        headers: { Authorization: "Bearer " + document.cookie.split("=")[1] }
      });

      if (res.data.status === "success") {
        this.setState({
          reviews: res.data.statistic.reviews,
          fee: res.data.statistic.fee,
          result: res.data.statistic.result,
          moneySpent: res.data.statistic.moneySpent
        });
      }
    } catch (err) {
      alert(err.response.data.message);
    }

    const labels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    const borderColor = [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)"
    ];

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };

    const ctx = document.getElementById("myChart1");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Money Spent",
            data: this.state.moneySpent,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: borderColor,
            borderWidth: 1
          }
        ]
      },
      options: options
    });

    const ctx2 = document.getElementById("myChart2");
    new Chart(ctx2, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Reviews",
            data: this.state.reviews,
            backgroundColor: ["rgba(255, 159, 64, 0.2)"],
            borderColor: borderColor,
            borderWidth: 1
          }
        ]
      },
      options: options
    });

    const ctx3 = document.getElementById("myChart3");
    new Chart(ctx3, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Balance",
            data: this.state.result,
            backgroundColor: ["rgba(75, 192, 192, 0.2)"],
            borderColor: borderColor,
            borderWidth: 1
          }
        ]
      },
      options: options
    });

    const ctx4 = document.getElementById("myChart4");
    new Chart(ctx4, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "PayPal Fee",
            data: this.state.fee,
            backgroundColor: ["rgba(153, 102, 255, 0.2)"],
            borderColor: borderColor,
            borderWidth: 1
          }
        ]
      },
      options: options
    });
  }

  render() {
    return (
      <main className="main">
        <div className="user-view">
          <div className="chart">
          <h1 className="chart__header heading-secondary">Statistic of the current year</h1>
            <div className="chart-container">
              <canvas id="myChart1" width="400" height="400">
                Your browser does not support the canvas element.
              </canvas>
            </div>
            <div className="chart-container">
              <canvas id="myChart2" width="400" height="400">
                Your browser does not support the canvas element.
              </canvas>
            </div>
            <div className="chart-container">
              <canvas id="myChart3" width="400" height="400">
                Your browser does not support the canvas element.
              </canvas>
            </div>
            <div className="chart-container">
              <canvas id="myChart4" width="400" height="400">
                Your browser does not support the canvas element.
              </canvas>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default StatisticPage;
