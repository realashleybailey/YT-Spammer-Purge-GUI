export const chartColors = {
  default: {
    primary: "#00D1B2",
    info: "#209CEE",
    danger: "#FF3860"
  }
}

export const chartOptionsMain = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  responsive: true,
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent"
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a"
        }
      }
    ],

    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(225,78,202,0.1)",
          zeroLineColor: "transparent"
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a"
        }
      }
    ]
  }
}

const randomChartData = (n) => {
  const data = []

  for (let i = 0; i < n; i++) {
    data.push(1 + i)
  }

  return data
}

const datasetObject = (color, points) => {
  return {
    fill: false,
    borderColor: "#8c67ef",
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: "#8c67ef",
    pointBorderColor: "rgba(0,255,255,0)",
    pointHoverBackgroundColor: chartColors.default[color],
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4,
    data: randomChartData(points),
    tension: 0.5,
    cubicInterpolationMode: "default"
  }
}

export const sampleChartData = (points = 9) => {
  const labels = []

  for (let i = 1; i <= points; i++) {
    // Current Time
    const now = new Date()
    // Future Time
    const future = new Date(now.getTime() + i * 1000 * 60 * 60 * 24)

    labels.push(future.toLocaleDateString())
  }

  return {
    labels,
    datasets: [datasetObject("primary", points)]
  }
}
