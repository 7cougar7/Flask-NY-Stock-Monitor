  var com = {
    1: function() {
      getDataSide();

    },
    2: function() {
      for (i = 1; i < 11; i++) {
        graphClick(("sideMarket" + JSON.stringify(i)), i, "#SS");
      }
      importantStocks();
      waitForSearch();
    },
    3: function() {
      $("#loading").hide()
      $("#main").show()
    }
  }
throttleActions(1000);