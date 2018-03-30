_DATA = [
  {
    "symbol": "A",
    "name": "Agilent Technologies Inc.",
    "date": "2018-03-29",
    "isEnabled": "true",
    "type": "cs",
    "iexId": "2"
  },
  {
    "symbol": "AA",
    "name": "Alcoa Corporation",
    "date": "2018-03-29",
    "isEnabled": "true",
    "type": "cs",
    "iexId": "12042"
  },
  {
    "symbol": "AABA",
    "name": "Altaba Inc.",
    "date": "2018-03-29",
    "isEnabled": "true",
    "type": "cs",
    "iexId": "7653"
  },
  {
    "symbol": "AAC",
    "name": "AAC Holdings Inc.",
    "date": "2018-03-29",
    "isEnabled": "true",
    "type": "cs",
    "iexId": "9169"
  },
  {
    "symbol": "AADR",
    "name": "AdvisorShares Dorsey Wright ADR",
    "date": "2018-03-29",
    "isEnabled": "true",
    "type": "et",
    "iexId": "5"
  },
  {
    "symbol": "AAL",
    "name": "American Airlines Group Inc.",
    "date": "2018-03-29",
    "isEnabled": "true",
    "type": "cs",
    "iexId": "8148"
  },
  {
    "symbol": "AAMC",
    "name": "Altisource Asset Management Corp Com",
    "date": "2018-03-29",
    "isEnabled": "true",
    "type": "cs",
    "iexId": "7760"
  },
  {
    "symbol": "AAME",
    "name": "Atlantic American Corporation",
    "date": "2018-03-29",
    "isEnabled": "true",
    "type": "cs",
    "iexId": "7"
  },
  {
    "symbol": "AAN",
    "name": "Aaron's Inc.",
    "date": "2018-03-29",
    "isEnabled": "true",
    "type": "cs",
    "iexId": "8"
  },
  {
    "symbol": "AAOI",
    "name": "Applied Optoelectronics Inc.",
    "date": "2018-03-29",
    "isEnabled": "true",
    "type": "cs",
    "iexId": "7790"
  },
  {
    "symbol": "AAON",
    "name": "AAON Inc.",
    "date": "2018-03-29",
    "isEnabled": "true",
    "type": "cs",
    "iexId": "9"
  },
  {
    "symbol": "AAP",
    "name": "Advance Auto Parts Inc W/I",
    "date": "2018-03-29",
    "isEnabled": "true",
    "type": "cs",
    "iexId": "10"
  },
  {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "date": "2018-03-29",
    "isEnabled": "true",
    "type": "cs",
    "iexId": "11"
  },
  {
    "symbol": "AAT",
    "name": "American Assets Trust Inc.",
    "date": "2018-03-29",
    "isEnabled": "true",
    "type": "cs",
    "iexId": "12"
  },
  {
    "symbol": "AAU",
    "name": "Almaden Minerals Ltd.",
    "date": "2018-03-29",
    "isEnabled": "true",
    "type": "cs",
    "iexId": "13"
  }]
  
def get_syms_by(sym):
    """
    Returns records that match on make
    select * from cars where make = ?
    """
    result = {}
    for i in _DATA:
        if _DATA[i]["symbol"]==sym:
            result.append(_DATA[i]["symbol"])
    return result