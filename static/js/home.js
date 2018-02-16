      $(document).ready(function() {


                $("#sideMarket1").load("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=KO&outputsize=compact&apikey=XB3FP5FNA3EUUPGH", function(json, status) {
                    //alert(status)
                    var data = json;
                    var data1 = JSON.parse(data);
                    $("#sideMarket1").replaceWith("Coca-Cola's Opening Price for 2/15/18: $"+(data1["Time Series (Daily)"]["2018-02-15"]["1. open"]));

                    });
                });
