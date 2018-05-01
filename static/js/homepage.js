  var com = {
    1: function() {
      getDataSide();
      getDataGain();
      getDataLose();
      setLatestUpdate();
    },
    2: function() {
      for (i = 1; i < 11; i++) {
        graphClick(("sideMarket" + JSON.stringify(i)), i, "#SS");
        graphClick(("BT" + JSON.stringify(i)), i, "#BS");
        graphClick(("LT" + JSON.stringify(i)), i, "#LS");
      }
      importantStocks();
      waitForSearch();
    },
    3: function() {
      $("#loading").hide();
      $("#main").show();
      welcomeMessage();
    }
  }
throttleActions(1000);