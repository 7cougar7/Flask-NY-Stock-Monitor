  var com = {
    1: function() {
      getDataSide();
      getDataMain("gainers","t01")
    },
    2: function() {
      for (i = 1; i < 11; i++) {
        graphClick(("sideMarket" + JSON.stringify(i)), i, "#SS");
        graphClick(("BT" + JSON.stringify(i)), i, "#BS");
        graphClick(("LT" + JSON.stringify(i)), i, "#LS");
		graphClick(("MT" + JSON.stringify(i)), i, "#MS");
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