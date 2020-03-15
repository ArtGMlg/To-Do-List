// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
	labels: ["Выполнено", "Не выполнено"],
	datasets: [{
	  data: [],
	  backgroundColor: ['#4e73df', '#1cc88a'],
	  hoverBackgroundColor: ['#2e59d9', '#17a673'],
	  hoverBorderColor: "rgba(234, 236, 244, 1)",
	}],
  },
  options: {
	maintainAspectRatio: false,
	tooltips: {
	  backgroundColor: "rgb(255,255,255)",
	  bodyFontColor: "#858796",
	  borderColor: '#dddfeb',
	  borderWidth: 1,
	  xPadding: 15,
	  yPadding: 15,
	  displayColors: false,
	  caretPadding: 10,
	},
	legend: {
	  display: false
	},
	cutoutPercentage: 80,
  },
});

function reciveInf(data) {
  var complite = 0;
  var incomplite = 0;
  var admin = JSON.parse(localStorage.getItem('admUser')).email;
  for (i=0; i<data.length; i++) {
    if (data[i].admin === admin && data[i].status === "incomplite") {
      incomplite = incomplite + 1;
    } else if (data[i].admin === admin && data[i].status === "complite"){
      complite = complite + 1;
    };
  };


	// Pie Chart Example

	myPieChart.data.datasets[0].data = [ complite, incomplite ];
	myPieChart.update();

};