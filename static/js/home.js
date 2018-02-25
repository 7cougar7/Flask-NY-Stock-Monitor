$(document).ready(function() {




  var getDataSide = function() {
    $.get("https://api.iextrading.com/1.0/stock/market/list/mostactive?displayPercent=true", function(json) {
      var batchReq = [];
      for (w = 0; w < json.length; w++) {
        batchReq[w] = (json[w].symbol);
      }
      // batchReq = batchReq.substring(0, batchReq.length - 1);
      console.log(batchReq);
      for (i = 0; i < batchReq.length; i++) {

        //var json = JSON.parse(data);
        var currSym = i;
        var changeSign = "";
        var color = "black";
        var compName = (json[currSym].companyName);
        console.log(compName);
        var currPrice = (json[currSym].delayedPrice).toFixed(2);
        var openPrice = (json[currSym].open).toFixed(2);
        var diffPrice = (json[currSym].change).toFixed(2);
        var perChange = (json[currSym].changePercent).toFixed(2);
        if (perChange < 0) {
          changeSign = "-";
          color = "red";
        } else {
          changeSign = "";
          color = "green";
        }
        console.log(color);

        $("#MN" + (i + 1)).replaceWith(compName + ":<br>$" + currPrice + "	" + "<span style='color:" + color + "'>$" + diffPrice + "	" + perChange + "%</span>")

      }
    });
  }
  var getDataGain = function() {
    $.get("https://api.iextrading.com/1.0/stock/market/list/gainers?displayPercent=true", function(json) {
      var batchReq = [];
      for (w = 0; w < json.length; w++) {
        batchReq[w] = (json[w].symbol);
      }
      // batchReq = batchReq.substring(0, batchReq.length - 1);
      console.log(batchReq);
      for (i = 0; i < batchReq.length; i++) {

        //var json = JSON.parse(data);
        var currSym = i;
        var changeSign = "";
        var color = "black";
        var compName = (json[currSym].companyName)
        console.log(compName);
        var currPrice = (json[currSym].delayedPrice).toFixed(2);
        var openPrice = (json[currSym].open).toFixed(2);
        var diffPrice = (json[currSym].change).toFixed(2);
        var perChange = (json[currSym].changePercent).toFixed(2);
        if (perChange < 0) {
          changeSign = "-";
          color = "red";
        } else {
          changeSign = "";
          color = "green";
        }
        $("#t01").append("<tr><td>" + compName + "</td><td>$" + currPrice + "</td><td><div style='color:" + color + "'>$" + diffPrice + "</div></td><td><div style='color:" + color + "'>" + perChange + "%</div></td></tr>");

      }
    });
  }
  var getDataLose = function() {
    $.get("https://api.iextrading.com/1.0/stock/market/list/losers?displayPercent=true", function(json) {
      var batchReq = [];
      for (w = 0; w < json.length; w++) {
        batchReq[w] = (json[w].symbol);
      }
      for (i = 0; i < batchReq.length; i++) {
        var currSym = i;
        var changeSign = "";
        var color = "black";
        var compName = (json[currSym].companyName);
        console.log(compName);
        var currPrice = (json[currSym].delayedPrice).toFixed(2);
        var openPrice = (json[currSym].open).toFixed(2);
        var diffPrice = (json[currSym].change).toFixed(2);
        var perChange = (json[currSym].changePercent).toFixed(2);
        if (perChange < 0) {
          changeSign = "-";
          color = "red";
        } else {
          changeSign = "";
          color = "green";
        }
        $("#t02").append("<tr><td>" + compName + "</td><td>$" + currPrice + "</td><td><div style='color:" + color + "'>$" + diffPrice + "</div></td><td><div style='color:" + color + "'>" + perChange + "%</div></td></tr>");

      }
    });
  }

  var com = {
    1: function() {
      getDataSide();
      getDataGain();
      getDataLose();
    },
    2: function() {
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
  throttleActions(((Math.floor(Math.random() * 4))*1000)+1000);


});
