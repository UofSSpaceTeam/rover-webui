function DrawGraph(){
    var chrt = document.getElementById("mycanvas").getContext("2d");
    var myarr = JSON.parse(localStorage.getItem("dataPointsY"));
    var xaxis = JSON.parse(localStorage.getItem("dataPointsX"));
    localStorage.setItem("dataPointsY",JSON.stringify(myarr));
    localStorage.setItem("dataPointsX",JSON.stringify(xaxis));
    var data = {
    labels:myarr  ,
    datasets: [
        {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: xaxis,
        }
    ]
};

var chartOptions = {
    animation : false,  // Edit: correction typo: from 'animated' to 'animation'
}

    var myFirstChart = new Chart(chrt).Line(data, chartOptions);
  }
