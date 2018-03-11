$(document).ready(function() {
  var getDataSide = function() {
    $.get("https://api.iextrading.com/1.0/stock/market/list/mostactive?displayPercent=true", function(json) {
      var batchReq = [];
      for (w = 0; w < json.length; w++) {
        batchReq[w] = (json[w].symbol);
      }
      // batchReq = batchReq.substring(0, batchReq.length - 1);
      // console.log(batchReq);
      for (i = 0; i < batchReq.length; i++) {
        //var json = JSON.parse(data);
        var currSym = (json[i].symbol);
        var changeSign = "";
        var color = "black";
        var compName = (json[i].companyName);
        //console.log(compName);
        var currPrice = (json[i].delayedPrice).toFixed(2);
        var openPrice = (json[i].open).toFixed(2);
        var diffPrice = (json[i].change).toFixed(2);
        var perChange = (json[i].changePercent).toFixed(2);
        if (perChange < 0) {
          changeSign = "-";
          color = "red";
        } else {
          changeSign = "";
          color = "#32CD32";
        }
        //console.log(color);

        $("#MN" + (i + 1)).replaceWith(compName + ":<br>$" + currPrice + "	" + "<span style='color:" + color + "'>$" + diffPrice + "	" + perChange + "%</span><span id='SS" + (i + 1) + "'>" + currSym + "</span>")
        document.getElementById("SS" + (i + 1)).style.display = "none";
      }
    });
  }
  var getDataGain = function() {
    $.get("https://api.iextrading.com/1.0/stock/market/list/losers?displayPercent=true", function(json) {
      var batchReq = [];
      for (w = 0; w < json.length; w++) {
        batchReq[w] = (json[w].symbol);
      }
      // batchReq = batchReq.substring(0, batchReq.length - 1);
      // console.log(batchReq);
      for (i = 0; i < batchReq.length; i++) {

        //var json = JSON.parse(data);
        var currSym = (json[i].symbol);
        var changeSign = "";
        var color = "black";
        var compName = (json[i].companyName)
        // console.log(compName);
        var currPrice = (json[i].delayedPrice).toFixed(2);
        var openPrice = (json[i].open).toFixed(2);
        var diffPrice = (json[i].change).toFixed(2);
        var perChange = (json[i].changePercent).toFixed(2);
        if (perChange < 0) {
          changeSign = "-";
          color = "red";
        } else {
          changeSign = "";
          color = "#32CD32";
        }
        $("#t01").append("<tr id='BT" + (i + 1) + "'><td>" + compName + "</td><td>$" + currPrice + "</td><td><div style='color:" + color + "'>$" + diffPrice + "</div></td><td><div style='color:" + color + "'>" + perChange + "%</div><span id='BS" + (i + 1) + "'>" + currSym + "</span></td></tr>");

        document.getElementById("BS" + (i + 1)).style.display = "none";
      }
    });
  }
  var getDataLose = function() {
    $.get("https://api.iextrading.com/1.0/stock/market/list/gainers?displayPercent=true", function(json) {
      var batchReq = [];
      for (w = 0; w < json.length; w++) {
        batchReq[w] = (json[w].symbol);
      }
      for (i = 0; i < batchReq.length; i++) {
        var currSym = (json[i].symbol);
        var changeSign = "";
        var color = "black";
        var compName = (json[i].companyName);
        // console.log(compName);
        var currPrice = (json[i].delayedPrice).toFixed(2);
        var openPrice = (json[i].open).toFixed(2);
        var diffPrice = (json[i].change).toFixed(2);
        var perChange = (json[i].changePercent).toFixed(2);
        if (perChange < 0) {
          changeSign = "-";
          color = "red";
        } else {
          changeSign = "";
          color = "#32CD32";
        }
        $("#t02").append("<tr id='LT" + (i + 1) + "'><td>" + compName + "</td><td>$" + currPrice + "</td><td><div style='color:" + color + "'>$" + diffPrice + "</div></td><td><div style='color:" + color + "'>" + perChange + "%</div><span id='LS" + (i + 1) + "'>" + currSym + "</span></td></tr>");
        document.getElementById("LS" + (i + 1)).style.display = "none";
      }
    });
  }

  var graphClick = function(iD, num, iDStart) {
    var Sym = $(iDStart + num).text();
    var modal = document.getElementById('popup');
    var btn = document.getElementById(iD);
    var span = document.getElementsByClassName("popup-close")[0];
    $.get("https://api.iextrading.com/1.0/stock/" + Sym + "/chart/1y", function(json) {
      var points = [];
      var labels = [];
      for (w = 0; w < Object.keys(json).length; w++) {
        points[(2 * w)] = (parseFloat(json[w]["open"]));
        points[(2 * w) + 1] = (parseFloat(json[w]["close"]));
        labels[w] = JSON.stringify(w + 1)
      }
      labels[Object.keys(json).length] = Object.keys(json).length;

      //console.log(points)
      btn.onclick = function() {
        modal.style.display = "block";
        $("#popup-message").replaceWith("<div id='popup-message'>" + Sym + "<canvas id='myChart'></canvas></div>")
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
          // The type of chart we want to create
          type: 'line',

          // The data for our dataset
          data: {
            labels: labels,
            datasets: [{

              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderColor: 'rgb(255, 99, 132)',
              data: points
            }]
          },

          // Configuration options go here
          options: {
            legend: {
              display: false,
              onClick: (e) => e.stopPropagation()

            },
            scales: {
              xAxes: [{
                display: false
              }]
            },
            maintainAspectRatio: false,
            responsive: true,
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 35
              }
            },
            elements: {
              line: {
                tension: 0, // disables bezier curves
              }
            }
          }

        });
        chart.update();
      }
      span.onclick = function() {
        modal.style.display = "none";
        $("#popup-message").replaceWith("<div id='popup-message'>" + Sym + "<canvas id='myChart" + Sym + "'></canvas></div>")
      }
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    })
  }

  var importantStocks = function() {
    $.getJSON("https://api.iextrading.com/1.0/stock/market/batch?symbols=qqq,cbsx,dia,gold,oil&types=quote", function(json) {
      var dispSym = ["NASDAQ","S&P 500", "DOW", "GOLD", "OIL"]
      var output = ""
      console.log(Object.keys(json)[0])
      for (i = 0; i < Object.keys(json).length; i++) {
        var color;
        var perChange = (json[Object.keys(json)[i]].quote.changePercent);
        if (perChange < 0) {
          color = "red";
        } else {
          color = "#32CD32";
        }
        output = output +"&emsp;&emsp;&emsp;&emsp;&emsp;"+ dispSym[i] + ": <span style='color:" + color + "'>$" + json[Object.keys(json)[i]].quote.latestPrice + "</span> "
      }
      $(".marquee").append(output)
      $('.marquee').marquee({
        duration: 5000
      });
    })

  }

  var com = {
    1: function() {
      getDataSide();
      getDataGain();
      getDataLose();
    },
    2: function() {
      for (i = 1; i < 11; i++) {
        graphClick(("sideMarket" + JSON.stringify(i)), i, "#SS");
        graphClick(("BT" + JSON.stringify(i)), i, "#BS")
        graphClick(("LT" + JSON.stringify(i)), i, "#LS")
      }
      importantStocks()
    },
    3: function() {
      $("#loading").hide()
      $("#main").show()
    }
  }



  var throttleActions = function(time) {
    var comLen = (Object.keys(com).length);
    for (i = 0; i < comLen; i++) {
      var myVar = setTimeout(com[Object.keys(com)[i]], (i * time))
    }
  };
  //throttleActions(((Math.floor(Math.random() * 4)) * 1000) + 1000);
  throttleActions(1000);



});
