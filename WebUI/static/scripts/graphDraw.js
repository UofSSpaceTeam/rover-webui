function DrawGraph(){
    var CurrentData = localStorage.getItem("CurrentDataSelected");
    var chrt = document.getElementById("mycanvas").getContext("2d");
    if(CurrentData == "Temp"){
      var data = localStorage.getItem("dataPointsTemperature");
      localStorage.setItem("dataPointsX",data);

    }
    else if(CurrentData =="Moist"){
      var data = localStorage.getItem("dataPointsMoisture");
      localStorage.setItem("dataPointsX",data);

    }
    else if (CurrentData == "Wheel"){
      var data = localStorage.getItem("dataPointsWheel");
      localStorage.setItem("dataPointsX",data);

    }

    yaxis = JSON.parse(localStorage.getItem("dataPointsY"));
    xaxis = JSON.parse(localStorage.getItem("dataPointsX"));
    localStorage.setItem("dataPointsY",JSON.stringify(yaxis));
    localStorage.setItem("dataPointsX",JSON.stringify(xaxis));
    var data = {
    labels: xaxis ,
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
            data: yaxis,
        }
    ]
};

var chartOptions = {
    animation : false,  // Edit: correction typo: from 'animated' to 'animation'
}

    var myFirstChart = new Chart(chrt).Line(data, chartOptions);
  }

  $(document).ready(function(){
                 $("#temperatureDropDown").click(function(){
                    localStorage.setItem("CurrentDataSelected","Temp");
    								});
                 $("#moistureDropDown").click(function(){
                    localStorage.setItem("CurrentDataSelected","Moist");
                  });
                 $("#wheelDropDown").click(function(){
                     localStorage.setItem("CurrentDataSelected","Wheel");
                   });

            });
