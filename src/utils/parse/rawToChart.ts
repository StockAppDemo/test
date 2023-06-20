/**
 * * parses chart data from alphavantage Day Time Series (5min) API
 * @param rawData
 * @returns
 */

export function parseRawToChart(rawData) {
  if (!rawData["Time Series (5min)"]) {
    return {}
  }
  var data = rawData["Time Series (5min)"]
  var retData = []
  var dataTime = []
  var lowest = Number.POSITIVE_INFINITY
  var highest = 0
  for (const property in data) {
    var open = parseFloat(data[property]["1. open"])
    var high = parseFloat(data[property]["2. high"])
    var low = parseFloat(data[property]["3. low"])
    var close = parseFloat(data[property]["4. close"])
    // var volume = parseFloat(data[property]["5. volume"])
    if (lowest > low) lowest = low
    if (highest < high) highest = high
    dataTime.push(property)
    retData.push([new Date(property.substring(0, 16)).getTime().valueOf(), open, high, low, close])
  }
  return {
    data: retData.reverse(),
    high: highest,
    low: lowest,
    times: dataTime.reverse(),
    symbol: rawData["Meta Data"]["2. Symbol"],
  }
}
