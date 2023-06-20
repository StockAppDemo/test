export function parseYFSymbol(symbol: string) {
  var typeOfEquity = "Stock"
  if (symbol.includes("^")) {
    typeOfEquity = "Index"
    symbol = symbol.replace("^", "")
  } else if (symbol.includes("-")) {
    typeOfEquity = "Crypto"
  } else if (symbol.includes(".")) {
    typeOfEquity = "For. Exchange"
  } else if (symbol.includes("=F")) {
    typeOfEquity = "Future"
  } else if (symbol.includes("=")) {
    typeOfEquity = "Currency"
  }
  return { type: typeOfEquity, symbol: symbol }
}
