// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}




$.ajax({
    url: "http://localhost:3000/tasks/get",
    type: 'GET',
    crossDomain: true,
    dataType: 'jsonp',
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
        DateInf(data);
    }
  });

function DateInf(data){
	var Jan= 0;
	var Feb= 0;
	var arrFeb = [];
	var Mar= 0;
	var Apr= 0;
	var May= 0;
	var Jun= 0;
	var Jul= 0;
	var Aug= 0;
	var Sep= 0;
	var Oct= 0;
	var Nov= 0;
	var Dec= 0;
	var admin = JSON.parse(localStorage.getItem('admUser')).email;
	

	for (i = 0; i < data.tasks.length; i++) {
		if (data.tasks[i].status === "complite" && data.tasks[i].admin === admin) {
			if (data.tasks[i].date === "2019-01-01" || data.tasks[i].date === "2019-01-02" || data.tasks[i].date === "2019-01-03" || data.tasks[i].date === "2019-01-04" || data.tasks[i].date === "2019-01-05" || data.tasks[i].date === "2019-01-06"|| data.tasks[i].date === "2019-01-07" || data.tasks[i].date === "2019-01-08" || data.tasks[i].date === "2019-01-09" || data.tasks[i].date === "2019-01-10" || data.tasks[i].date === "2019-01-11" || data.tasks[i].date === "2019-01-12" || data.tasks[i].date === "2019-01-13" || data.tasks[i].date === "2019-01-14" || data.tasks[i].date === "2019-01-15" || data.tasks[i].date === "2019-01-16" || data.tasks[i].date === "2019-01-17" || data.tasks[i].date === "2019-01-18" || data.tasks[i].date === "2019-01-19" || data.tasks[i].date === "2019-01-20" || data.tasks[i].date === "2019-01-21" || data.tasks[i].date === "2019-01-22" || data.tasks[i].date === "2019-01-23" || data.tasks[i].date === "2019-01-24" || data.tasks[i].date === "2019-01-25" || data.tasks[i].date === "2019-01-26" || data.tasks[i].date === "2019-01-27" || data.tasks[i].date === "2019-01-28" || data.tasks[i].date === "2019-01-29" || data.tasks[i].date === "2019-01-30" || data.tasks[i].date === "2019-01-31") {
				Jan = Jan + 1;
			}
			else if (data.tasks[i].date === "2019-02-01" || data.tasks[i].date === "2019-02-02" || data.tasks[i].date === "2019-02-03" || data.tasks[i].date === "2019-02-04" || data.tasks[i].date === "2019-02-05" || data.tasks[i].date === "2019-02-06" || data.tasks[i].date === "2019-02-07" || data.tasks[i].date === "2019-02-08" || data.tasks[i].date === "2019-02-09" || data.tasks[i].date === "2019-02-10" || data.tasks[i].date === "2019-02-11" || data.tasks[i].date === "2019-02-12" || data.tasks[i].date === "2019-02-13" || data.tasks[i].date === "2019-02-14" || data.tasks[i].date === "2019-02-15" || data.tasks[i].date === "2019-02-16" || data.tasks[i].date === "2019-02-17" || data.tasks[i].date === "2019-02-18" || data.tasks[i].date === "2019-02-19" || data.tasks[i].date === "2019-02-20" || data.tasks[i].date === "2019-02-21" || data.tasks[i].date === "2019-02-22" || data.tasks[i].date === "2019-02-23" || data.tasks[i].date === "2019-02-24" || data.tasks[i].date === "2019-02-25" || data.tasks[i].date === "2019-02-26" || data.tasks[i].date === "2019-02-27" || data.tasks[i].date === "2019-02-28") {
				Feb = Feb + 1;
			}
			else if (data.tasks[i].date === "2019-03-01" || data.tasks[i].date === "2019-03-02" || data.tasks[i].date === "2019-03-03" || data.tasks[i].date === "2019-03-04" || data.tasks[i].date === "2019-03-05" || data.tasks[i].date === "2019-03-06"|| data.tasks[i].date === "2019-03-07" || data.tasks[i].date === "2019-03-08" || data.tasks[i].date === "2019-03-09" || data.tasks[i].date === "2019-03-10" || data.tasks[i].date === "2019-03-11" || data.tasks[i].date === "2019-03-12" || data.tasks[i].date === "2019-03-13" || data.tasks[i].date === "2019-03-14" || data.tasks[i].date === "2019-03-15" || data.tasks[i].date === "2019-03-16" || data.tasks[i].date === "2019-03-17" || data.tasks[i].date === "2019-03-18" || data.tasks[i].date === "2019-03-19" || data.tasks[i].date === "2019-03-20" || data.tasks[i].date === "2019-03-21" || data.tasks[i].date === "2019-03-22" || data.tasks[i].date === "2019-03-23" || data.tasks[i].date === "2019-03-24" || data.tasks[i].date === "2019-03-25" || data.tasks[i].date === "2019-03-26" || data.tasks[i].date === "2019-03-27" || data.tasks[i].date === "2019-03-28" || data.tasks[i].date === "2019-03-29" || data.tasks[i].date === "2019-03-30" || data.tasks[i].date === "2019-03-31") {
				Mar = Mar + 1;
			}else if (data.tasks[i].date === "2019-04-01" || data.tasks[i].date === "2019-04-02" || data.tasks[i].date === "2019-04-03" || data.tasks[i].date === "2019-04-04" || data.tasks[i].date === "2019-04-05" || data.tasks[i].date === "2019-04-06" || data.tasks[i].date === "2019-04-07" || data.tasks[i].date === "2019-04-08" || data.tasks[i].date === "2019-04-09" || data.tasks[i].date === "2019-04-10" || data.tasks[i].date === "2019-04-11" || data.tasks[i].date === "2019-04-12" || data.tasks[i].date === "2019-04-13" || data.tasks[i].date === "2019-04-14" || data.tasks[i].date === "2019-04-15" || data.tasks[i].date === "2019-04-16" || data.tasks[i].date === "2019-04-17" || data.tasks[i].date === "2019-04-18" || data.tasks[i].date === "2019-04-19" || data.tasks[i].date === "2019-04-20" || data.tasks[i].date === "2019-04-21" || data.tasks[i].date === "2019-04-22" || data.tasks[i].date === "2019-04-23" || data.tasks[i].date === "2019-04-24" || data.tasks[i].date === "2019-04-25" || data.tasks[i].date === "2019-04-26" || data.tasks[i].date === "2019-04-27" || data.tasks[i].date === "2019-04-28" || data.tasks[i].date === "2019-04-29" || data.tasks[i].date === "2019-04-30") {

			}
			else if (data.tasks[i].date === "2019-05-01" || data.tasks[i].date === "2019-05-02" || data.tasks[i].date === "2019-05-03" || data.tasks[i].date === "2019-05-04" || data.tasks[i].date === "2019-05-05" || data.tasks[i].date === "2019-05-06"|| data.tasks[i].date === "2019-05-07" || data.tasks[i].date === "2019-05-08" || data.tasks[i].date === "2019-05-09" || data.tasks[i].date === "2019-05-10" || data.tasks[i].date === "2019-05-11" || data.tasks[i].date === "2019-05-12" || data.tasks[i].date === "2019-05-13" || data.tasks[i].date === "2019-05-14" || data.tasks[i].date === "2019-05-15" || data.tasks[i].date === "2019-05-16" || data.tasks[i].date === "2019-05-17" || data.tasks[i].date === "2019-05-18" || data.tasks[i].date === "2019-05-19" || data.tasks[i].date === "2019-05-20" || data.tasks[i].date === "2019-05-21" || data.tasks[i].date === "2019-05-22" || data.tasks[i].date === "2019-05-23" || data.tasks[i].date === "2019-05-24" || data.tasks[i].date === "2019-05-25" || data.tasks[i].date === "2019-05-26" || data.tasks[i].date === "2019-05-27" || data.tasks[i].date === "2019-05-28" || data.tasks[i].date === "2019-05-29" || data.tasks[i].date === "2019-05-30" || data.tasks[i].date === "2019-05-31") {
				May = May + 1;
			}
			else if (data.tasks[i].date === "2019-06-01" || data.tasks[i].date === "2019-06-02" || data.tasks[i].date === "2019-06-03" || data.tasks[i].date === "2019-06-04" || data.tasks[i].date === "2019-06-05" || data.tasks[i].date === "2019-06-06" || data.tasks[i].date === "2019-06-07" || data.tasks[i].date === "2019-06-08" || data.tasks[i].date === "2019-06-09" || data.tasks[i].date === "2019-06-10" || data.tasks[i].date === "2019-06-11" || data.tasks[i].date === "2019-06-12" || data.tasks[i].date === "2019-06-13" || data.tasks[i].date === "2019-06-14" || data.tasks[i].date === "2019-06-15" || data.tasks[i].date === "2019-06-16" || data.tasks[i].date === "2019-06-17" || data.tasks[i].date === "2019-06-18" || data.tasks[i].date === "2019-06-19" || data.tasks[i].date === "2019-06-20" || data.tasks[i].date === "2019-06-21" || data.tasks[i].date === "2019-06-22" || data.tasks[i].date === "2019-06-23" || data.tasks[i].date === "2019-06-24" || data.tasks[i].date === "2019-06-25" || data.tasks[i].date === "2019-06-26" || data.tasks[i].date === "2019-06-27" || data.tasks[i].date === "2019-06-28" || data.tasks[i].date === "2019-06-29" || data.tasks[i].date === "2019-06-30") {
				Jun = Jun + 1;
			}
			else if (data.tasks[i].date === "2019-07-01" || data.tasks[i].date === "2019-07-02" || data.tasks[i].date === "2019-07-03" || data.tasks[i].date === "2019-07-04" || data.tasks[i].date === "2019-07-05" || data.tasks[i].date === "2019-07-06"|| data.tasks[i].date === "2019-07-07" || data.tasks[i].date === "2019-07-08" || data.tasks[i].date === "2019-07-09" || data.tasks[i].date === "2019-07-10" || data.tasks[i].date === "2019-07-11" || data.tasks[i].date === "2019-07-12" || data.tasks[i].date === "2019-07-13" || data.tasks[i].date === "2019-07-14" || data.tasks[i].date === "2019-07-15" || data.tasks[i].date === "2019-07-16" || data.tasks[i].date === "2019-07-17" || data.tasks[i].date === "2019-07-18" || data.tasks[i].date === "2019-07-19" || data.tasks[i].date === "2019-07-20" || data.tasks[i].date === "2019-07-21" || data.tasks[i].date === "2019-07-22" || data.tasks[i].date === "2019-07-23" || data.tasks[i].date === "2019-07-24" || data.tasks[i].date === "2019-07-25" || data.tasks[i].date === "2019-07-26" || data.tasks[i].date === "2019-07-27" || data.tasks[i].date === "2019-07-28" || data.tasks[i].date === "2019-07-29" || data.tasks[i].date === "2019-07-30" || data.tasks[i].date === "2019-07-31") {
				Jul = Jul + 1;
			}
			else if (data.tasks[i].date === "2019-08-01" || data.tasks[i].date === "2019-08-02" || data.tasks[i].date === "2019-08-03" || data.tasks[i].date === "2019-08-04" || data.tasks[i].date === "2019-08-05" || data.tasks[i].date === "2019-08-06"|| data.tasks[i].date === "2019-08-07" || data.tasks[i].date === "2019-08-08" || data.tasks[i].date === "2019-08-09" || data.tasks[i].date === "2019-08-10" || data.tasks[i].date === "2019-08-11" || data.tasks[i].date === "2019-08-12" || data.tasks[i].date === "2019-08-13" || data.tasks[i].date === "2019-08-14" || data.tasks[i].date === "2019-08-15" || data.tasks[i].date === "2019-08-16" || data.tasks[i].date === "2019-08-17" || data.tasks[i].date === "2019-08-18" || data.tasks[i].date === "2019-08-19" || data.tasks[i].date === "2019-08-20" || data.tasks[i].date === "2019-08-21" || data.tasks[i].date === "2019-08-22" || data.tasks[i].date === "2019-08-23" || data.tasks[i].date === "2019-08-24" || data.tasks[i].date === "2019-08-25" || data.tasks[i].date === "2019-08-26" || data.tasks[i].date === "2019-08-27" || data.tasks[i].date === "2019-08-28" || data.tasks[i].date === "2019-08-29" || data.tasks[i].date === "2019-08-30" || data.tasks[i].date === "2019-08-31") {
				Aug = Aug + 1;
			}
			else if (data.tasks[i].date === "2019-09-01" || data.tasks[i].date === "2019-09-02" || data.tasks[i].date === "2019-09-03" || data.tasks[i].date === "2019-09-04" || data.tasks[i].date === "2019-09-05" || data.tasks[i].date === "2019-09-06" || data.tasks[i].date === "2019-09-07" || data.tasks[i].date === "2019-09-08" || data.tasks[i].date === "2019-09-09" || data.tasks[i].date === "2019-09-10" || data.tasks[i].date === "2019-09-11" || data.tasks[i].date === "2019-09-12" || data.tasks[i].date === "2019-09-13" || data.tasks[i].date === "2019-09-14" || data.tasks[i].date === "2019-09-15" || data.tasks[i].date === "2019-09-16" || data.tasks[i].date === "2019-09-17" || data.tasks[i].date === "2019-09-18" || data.tasks[i].date === "2019-09-19" || data.tasks[i].date === "2019-09-20" || data.tasks[i].date === "2019-09-21" || data.tasks[i].date === "2019-09-22" || data.tasks[i].date === "2019-09-23" || data.tasks[i].date === "2019-09-24" || data.tasks[i].date === "2019-09-25" || data.tasks[i].date === "2019-09-26" || data.tasks[i].date === "2019-09-27" || data.tasks[i].date === "2019-09-28" || data.tasks[i].date === "2019-09-29" || data.tasks[i].date === "2019-09-30") {
				Sep = Sep + 1;
			}
			else if (data.tasks[i].date === "2019-10-01" || data.tasks[i].date === "2019-10-02" || data.tasks[i].date === "2019-10-03" || data.tasks[i].date === "2019-10-04" || data.tasks[i].date === "2019-10-05" || data.tasks[i].date === "2019-10-06"|| data.tasks[i].date === "2019-10-07" || data.tasks[i].date === "2019-10-08" || data.tasks[i].date === "2019-10-09" || data.tasks[i].date === "2019-10-10" || data.tasks[i].date === "2019-10-11" || data.tasks[i].date === "2019-10-12" || data.tasks[i].date === "2019-10-13" || data.tasks[i].date === "2019-10-14" || data.tasks[i].date === "2019-10-15" || data.tasks[i].date === "2019-10-16" || data.tasks[i].date === "2019-10-17" || data.tasks[i].date === "2019-10-18" || data.tasks[i].date === "2019-10-19" || data.tasks[i].date === "2019-10-20" || data.tasks[i].date === "2019-10-21" || data.tasks[i].date === "2019-10-22" || data.tasks[i].date === "2019-10-23" || data.tasks[i].date === "2019-10-24" || data.tasks[i].date === "2019-10-25" || data.tasks[i].date === "2019-10-26" || data.tasks[i].date === "2019-10-27" || data.tasks[i].date === "2019-10-28" || data.tasks[i].date === "2019-10-29" || data.tasks[i].date === "2019-10-30" || data.tasks[i].date === "2019-10-31") {
				Oct = Oct + 1;
			}
			else if (data.tasks[i].date === "2019-11-01" || data.tasks[i].date === "2019-11-02" || data.tasks[i].date === "2019-11-03" || data.tasks[i].date === "2019-11-04" || data.tasks[i].date === "2019-11-05" || data.tasks[i].date === "2019-11-06" || data.tasks[i].date === "2019-11-07" || data.tasks[i].date === "2019-11-08" || data.tasks[i].date === "2019-11-09" || data.tasks[i].date === "2019-11-10" || data.tasks[i].date === "2019-11-11" || data.tasks[i].date === "2019-11-12" || data.tasks[i].date === "2019-11-13" || data.tasks[i].date === "2019-11-14" || data.tasks[i].date === "2019-11-15" || data.tasks[i].date === "2019-11-16" || data.tasks[i].date === "2019-11-17" || data.tasks[i].date === "2019-11-18" || data.tasks[i].date === "2019-11-19" || data.tasks[i].date === "2019-11-20" || data.tasks[i].date === "2019-11-21" || data.tasks[i].date === "2019-11-22" || data.tasks[i].date === "2019-11-23" || data.tasks[i].date === "2019-11-24" || data.tasks[i].date === "2019-11-25" || data.tasks[i].date === "2019-11-26" || data.tasks[i].date === "2019-11-27" || data.tasks[i].date === "2019-11-28" || data.tasks[i].date === "2019-11-29" || data.tasks[i].date === "2019-11-30") {
				Nov = Nov + 1;
			}
			else if (data.tasks[i].date === "2019-12-01" || data.tasks[i].date === "2019-12-02" || data.tasks[i].date === "2019-12-03" || data.tasks[i].date === "2019-12-04" || data.tasks[i].date === "2019-12-05" || data.tasks[i].date === "2019-12-06"|| data.tasks[i].date === "2019-12-07" || data.tasks[i].date === "2019-12-08" || data.tasks[i].date === "2019-12-09" || data.tasks[i].date === "2019-12-10" || data.tasks[i].date === "2019-12-11" || data.tasks[i].date === "2019-12-12" || data.tasks[i].date === "2019-12-13" || data.tasks[i].date === "2019-12-14" || data.tasks[i].date === "2019-12-15" || data.tasks[i].date === "2019-12-16" || data.tasks[i].date === "2019-12-17" || data.tasks[i].date === "2019-12-18" || data.tasks[i].date === "2019-12-19" || data.tasks[i].date === "2019-12-20" || data.tasks[i].date === "2019-12-21" || data.tasks[i].date === "2019-12-22" || data.tasks[i].date === "2019-12-23" || data.tasks[i].date === "2019-12-24" || data.tasks[i].date === "2019-12-25" || data.tasks[i].date === "2019-12-26" || data.tasks[i].date === "2019-12-27" || data.tasks[i].date === "2019-12-28" || data.tasks[i].date === "2019-12-29" || data.tasks[i].date === "2019-12-30" || data.tasks[i].date === "2019-12-31") {
				Dec = Dec + 1;
			}
		}
	}


// Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    datasets: [{
      label: "Выполнено",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return '' + number_format(value);
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ' ' + number_format(tooltipItem.yLabel);
        }
      }
    }
  }  
});
myLineChart.data.datasets[0].data = [ Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec ];
myLineChart.update();
};
