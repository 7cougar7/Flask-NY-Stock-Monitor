$(document).ready(function() {
  var loadMainM = function(Sym) {
    var changeSign = "";
    $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + Sym + "&outputsize=compact&apikey=XB3FP5FNA3EUUPGH", function(json) {
      var data1 = json;
      var date = (data1["Meta Data"]["3. Last Refreshed"]);
      var openPrice = (data1["Time Series (Daily)"][date]["1. open"]);
      $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + Sym + "&interval=1min&apikey=XB3FP5FNA3EUUPGH", function(json1) {
        var data3 = json1;
        var date1 = (data3["Meta Data"]["3. Last Refreshed"]);
        var currPrice = (data3["Time Series (1min)"][date1]["1. open"]);
        var diffPrice = (parseFloat(currPrice) - parseFloat(openPrice)).toFixed(2);
        if (diffPrice < 0) {
          changeSign = "-";
          diffPrice = Math.abs(diffPrice);
        }
        var perChange = ((((parseFloat(currPrice) / parseFloat(openPrice)) * 100) - 100).toFixed(2));
        $("#t01").append("<tr><td>" + Sym + "</td><td>" + currPrice + "</td><td>" + diffPrice + "</td><td>" + perChange + "</td></tr>");
      });
    });
  };

  var loadSideM = function(iD, Sym) {
    var changeSign = "";
    $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + Sym + "&outputsize=compact&apikey=XB3FP5FNA3EUUPGH", function(json) {
      var data1 = json;
      var date = (data1["Meta Data"]["3. Last Refreshed"]);
      var openPrice = (data1["Time Series (Daily)"][date]["1. open"]);

      $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + Sym + "&interval=1min&apikey=XB3FP5FNA3EUUPGH", function(json1) {
        var data3 = json1;
        var date1 = (data3["Meta Data"]["3. Last Refreshed"]);
        var currPrice = (data3["Time Series (1min)"][date1]["1. open"]);
        $("#CP" + iD).replaceWith(Sym + " Current Price: $" + currPrice);
        var diffPrice = (parseFloat(currPrice) - parseFloat(openPrice)).toFixed(2);
        if (diffPrice < 0) {
          changeSign = "-";
          diffPrice = Math.abs(diffPrice);
        }
        $("#MN" + iD).replaceWith(Sym + " Opening Price: $" + openPrice);
        $("#DP" + iD).replaceWith(Sym + " $ Difference: " + changeSign + "$" + diffPrice);
        var perChange = ((((parseFloat(currPrice) / parseFloat(openPrice)) * 100) - 100).toFixed(2));
        $("#PC" + iD).replaceWith(Sym + " % Difference: " + perChange + "%");
      });
    });

  };


  var com = {
    1: function() {
      loadMainM("NFLX")
    },
    2: function() {
      loadSideM("1", "BA")
    },
    3: function() {
      loadMainM("LFIN")
    },
    4: function() {
      loadSideM("2", "KO")
    },
    5: function() {
      loadMainM("SBUX")
    },
    6: function() {
      loadSideM("3", "SBUX")
    },
    7: function() {
      loadMainM("DIS")
    },
    8: function() {
      loadSideM("4", "DIS")
    },
    9: function() {
      loadMainM("NDX")
    },
    10: function() {
      loadSideM("5", "NDX")
    },
    11: function() {
      loadMainM("AAPL")
    },
    12: function() {
      loadSideM("6", "AAPL")
    },
    13: function() {
      loadMainM("DJIA")
    },
    14: function() {
      loadSideM("7", "DJIA")
    },
    15: function() {
      loadMainM("MFST")
    },
    16: function() {
      loadSideM("8", "MSFT")
    },
    17: function() {
      loadMainM("GOOGL")
    },
    18: function() {
      loadSideM("9", "GOOGL")
    },
    19: function() {
      loadMainM("SPX")
    },
    20: function() {
      loadSideM("10", "SPX")
    },
    21: function() {
      $("#loading").hide()
      $("#main").show()
    }
  }
  console.log(Object.keys(com));
  var throttleActions = function(time) {
    var comLen = (Object.keys(com).length);
    for (i = 0; i < comLen; i++) {
      var myVar = setTimeout(com[Object.keys(com)[i]], (i * time))
    }
  };
  throttleActions(3000);
});
