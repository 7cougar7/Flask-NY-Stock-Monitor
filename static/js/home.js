$(document).ready(function() {


    var d = new Date();
    var date1= ((d.getMonth()+1)<10 ? '0' : '') + (d.getMonth()+1) + '-' +(d.getDate()<10 ? '0' : '') + d.getDate() + "-"  +d.getFullYear()

    var is_weekend =  function(date2){
    var dt = new Date(date2);
    if(dt.getDay() == 6)
       {
        return 1;
        }else if(dt.getDay()==0){
        return 2;
    }else{
        return 0;
    }
}

    var date =  d.getFullYear() + '-' + ((d.getMonth()+1)<10 ? '0' : '') + (d.getMonth()+1) + '-' + (d.getDate()<10 ? '0' : '') + (d.getDate()-is_weekend(date1));
    alert('weekend: '+is_weekend(date1));

var dateTime;
var data;
var data1;
var data2;
var data3;
var openingPrice=0;
var currentPrice=0;

                $("#sideMarket2").load("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=KO&interval=1min&apikey=XB3FP5FNA3EUUPGH",function(json){

                 data2 = json;

                    data3 = JSON.parse(data2);
                    //alert("2");
                    dateTime=(data3["Meta Data"]["3. Last Refreshed"]);
                    alert("dateTime: "+dateTime);
                    currentPrice = parseFloat(data3["Time Series (1min)"][dateTime]["1. open"]);
                    $("#sideMarket2").replaceWith("Coca-Cola's Opening Price for "+date+ ": $"+currentPrice);

                });

                $("#sideMarket1").load("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=KO&outputsize=compact&apikey=XB3FP5FNA3EUUPGH", function(json) {
                    //alert(status)
                    data = json;
                    data1 = JSON.parse(data);
                    openingPrice = parseFloat(data1["Time Series (Daily)"][date]["1. open"]);
                    $("#sideMarket1").replaceWith("Coca-Cola's Opening Price for "+date+ ": $"+openingPrice);
                    alert("1");
                    });



//parseFloat(data1["Time Series (Daily)"][date]["1. open"])-
                });
