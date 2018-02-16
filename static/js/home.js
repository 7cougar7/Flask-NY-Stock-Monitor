$(document).ready(function(){

    $("button").click(function(){
        $("#div1").load("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=KO&outputsize=compact&apikey=XB3FP5FNA3EUUPGH", function(data){
                var my_json=data;
                alert(my_json);
            });
    });
});