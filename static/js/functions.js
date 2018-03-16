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

        var color = "black";
        var compName = (json[i].companyName);
        //console.log(compName);
        var currPrice = Math.abs(json[i].delayedPrice).toFixed(2);
        var openPrice = Math.abs(json[i].open).toFixed(2);
        var diffPrice = Math.abs(json[i].change).toFixed(2);
        var perChange = (json[i].changePercent).toFixed(2);
        if (perChange < 0) {
          color = "red";
          perChange=Math.abs(perChange)
        } else {

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
        var currPrice = Math.abs(json[i].delayedPrice).toFixed(2);
        var openPrice = Math.abs(json[i].open).toFixed(2);
        var diffPrice = Math.abs(json[i].change).toFixed(2);
        var perChange = (json[i].changePercent).toFixed(2);
        if (perChange < 0) {
          color = "red";
          perChange=Math.abs(perChange)
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
        var currPrice = Math.abs(json[i].delayedPrice).toFixed(2);
        var openPrice = Math.abs(json[i].open).toFixed(2);
        var diffPrice = Math.abs(json[i].change).toFixed(2);
        var perChange = (json[i].changePercent).toFixed(2);
        if (perChange < 0) {
          color = "red";
          perChange=Math.abs(perChange)
        } else {
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
    $.getJSON("https://api.iextrading.com/1.0/stock/market/batch?symbols=oneq,dia,spy,gold,oil&types=quote", function(json) {
      var dispSym = ["NASDAQ", 25, "DOW", 100, "S&P 500", 10, "GOLD", 1, "OIL", 1]
      var output = ""
      console.log(Object.keys(json)[0])
      for (i = 0; i < (Object.keys(json).length) / 2; i++) {
        var color;
        var perChange = (json[Object.keys(json)[2 * i]].quote.changePercent);
        if (perChange < 0) {
          color = "red";
        } else {
          color = "#32CD32";
        }
        output = output + "&emsp;&emsp;&emsp;&emsp;&emsp;" + dispSym[2 * i] + ": <span style='color:" + color + "'>$" + (json[Object.keys(json)[2 * i]].quote.latestPrice * (dispSym[(2 * i) + 1])).toFixed(2) + "</span> "
      }
      $(".marquee").append(output)
      $('.marquee').marquee({
        duration: 5000,
        duplicated: true
      });
    })

  }

  function getImageDirectoryByFullURL(url) {
    return url.substr(url.lastIndexOf("/") + 1);
  }

  var waitForSearch = function() {
    $("#searchBar").on('keyup', function(e) {
      if (e.keyCode == 13) {
        //alert($('#searchBar').val())
        location.replace("http://7cougar7.pythonanywhere.com/search/"+($('#searchBar').val()));
      }
    });
  }

  var searchResults = function() {
    var Sym = getImageDirectoryByFullURL(window.location.href)
$("#mainsizer").hide()
    //alert(getImageDirectoryByFullURL(window.location.href))
    $.get("https://api.iextrading.com/1.0/stock/" + Sym + "/batch?types=quote,chart&range=6m", function(json) {
       		$("#searchError").hide()
		$("#mainsizer").show()
      var points = [];
      var labels = [];
      var color = "black"
      var perChange = (json.quote.changePercent * 100).toFixed(2);
      if (perChange < 0) {
        color = "red";
      } else {
        color = "#32CD32";
      }
      for (w = 0; w < Object.keys(json.chart).length; w++) {
        points[(2 * w)] = (parseFloat(json.chart[w]["open"]));
        points[(2 * w) + 1] = (parseFloat(json.chart[w]["close"]));
        labels[w] = JSON.stringify(w + 1)
      }
      labels[Object.keys(json.chart).length] = Object.keys(json.chart).length
      $("#updated").append(json.quote.latestTime)
      $("#maintitle").append(json.quote.companyName)
      $("#currPr").append("$" + json.quote.latestPrice)
      $("#diffPr").append("<span style='color:" + color + "'>$" + Math.abs(json.quote.change).toFixed(2) + "&emsp;&emsp;&emsp;" + Math.abs(perChange).toFixed(2) + "%</span>")
      var ctx = document.getElementById('mainchart').getContext('2d');
      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
          labels: labels,
          datasets: [{
            pointBorderWidth: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            data: points
          }]
        },

        // Configuration options go here
        options: {
          point: {
            radius: 1
          },
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
              bottom: 0
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
    })

  }


  var throttleActions = function(time) {
    var comLen = (Object.keys(com).length);
    for (i = 0; i < comLen; i++) {
      var myVar = setTimeout(com[Object.keys(com)[i]], (i * time))
    }
  };