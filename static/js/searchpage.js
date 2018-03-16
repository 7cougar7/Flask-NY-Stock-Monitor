  var com = {
    1: function() {
      getDataSide();
      searchResults();
    },
    2: function() {
      for (i = 1; i < 11; i++) {
        graphClick(("sideMarket" + JSON.stringify(i)), i, "#SS");
      }
      importantStocks();
      $(".marquee").show();
      waitForSearch();
    },
    3: function() {
      $("#loading").hide()
      $("#main").show()
      $(".marquee").show()
    }
  }


  throttleActions(1000);
