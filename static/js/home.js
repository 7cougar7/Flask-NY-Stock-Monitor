$(document).ready(function() {
  var loadSideM = function(iD, Sym) {
  	var changeSign="";
    $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + Sym + "&outputsize=compact&apikey=XB3FP5FNA3EUUPGH", function(json) {
      var data1 = json;
      var date = (data1["Meta Data"]["3. Last Refreshed"]);
      var openPrice = (data1["Time Series (Daily)"][date]["1. open"]);
      $("#MN" + iD).replaceWith(Sym + " Opening Price: $" + openPrice);
      $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + Sym + "&interval=1min&apikey=XB3FP5FNA3EUUPGH", function(json1) {
        var data3 = json1;
        var date1 = (data3["Meta Data"]["3. Last Refreshed"]);
        var currPrice = (data3["Time Series (1min)"][date1]["1. open"]);
        console.log(currPrice);
        $("#CP" + iD).replaceWith(Sym + " Current Price: $" + currPrice);
        var diffPrice = (parseFloat(currPrice)-parseFloat(openPrice)).toFixed(2);
        if (diffPrice<0){
        changeSign="-";
        diffPrice=Math.abs(diffPrice);
        }
        $("#DP"+iD).replaceWith(Sym + " $ Difference: "+changeSign+"$"+diffPrice);
        var perChange=((((parseFloat(currPrice)/parseFloat(openPrice))*100)-100).toFixed(2));
        $("#PC"+iD).replaceWith(Sym + " % Difference: "+perChange+"%");
      })
    })
  };
  loadSideM("1", "BA");
  loadSideM("2", "KO");
  loadSideM("3", "SBUX");
  loadSideM("4", "DIS");
  loadSideM("5", "NDX");
  loadSideM("6", "AAPL");
  loadSideM("7", "DJIA");
  loadSideM("8", "MSFT");
  loadSideM("9", "GOOGL");
  loadSideM("10","SPX");
});

