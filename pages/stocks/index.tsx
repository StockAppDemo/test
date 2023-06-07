import { NextPageContext } from "next"
import {useState, Component, useEffect} from 'react'
// import {myGet} from 'api/myGet'
import Stock from 'src/components/stocks/Stock'
import classes from 'styles/stocks.module.css';
import { findDOMNode, render } from 'react-dom'
import cookie from "js-cookie"
import myFetch from "src/utils/myFetch"
import StockPredictions from "src/components/stocks/StockPredictions";
import {StockT, PredictionT} from "src/ts/interfaces/stocks"

export default function Stocks () {
  const [dataLoaded,setDataLoaded] = useState(false)
  const [stocks,setStocks] = useState<StockT[]>([])
  const [trendingStocks,setTrendingStocks] = useState<StockT[]>([])
  const [user,setUser] = useState({email:""})
  const [stockPredictions, setStockPredictions] = useState<PredictionT[]>([])
  useEffect(() => { // Get Data
    const authCookie = cookie.get("auth") 
    myFetch(`/api/stocks`,{
      method: "GET",
      headers: {
        auth: authCookie
      }})
      .then((data) => {
        if(typeof data.stocks === "undefined"){data.stocks = []}
        setUser(data.user)
        setStocks(() => {
          return data.stocks.map((item) => {
            return {...item,favorited:true}
          })
        })
        const tickers = data.stocks.map((stockItem) => {return stockItem.symbol})
        setTrendingStocks((item) => {
          return data.trending.map((item) => {
            return item.symbol in tickers ? {...item,favorited:true} : item
          })
        })
        setDataLoaded(true)
      })
  },[]);

  function deleteHandler(pos){
    var tempStocks = []
    tempStocks = stocks.slice()
    var deletedStock = (tempStocks.splice(pos,1))[0]
    const trendingSymbols = trendingStocks.map((stockItem) => {return stockItem.symbol})
    const trendingPos = trendingSymbols.indexOf(deletedStock.symbol)
    console.log("deleted stock",deletedStock,"trending symbols",trendingSymbols,trendingPos)

    if (trendingPos != -1){
      console.log("DELETE TRENDING")
      setTrendingStocks((currentTrending)=>{
        currentTrending[trendingPos] = {...currentTrending[trendingPos],favorited:false}
        return currentTrending
      })
    }
    setStocks(tempStocks)
    var stocksList = []
    for (i = 0; i < tempStocks.length; i++){
      stocksList.push(tempStocks[i].symbol)
    }
    updateStocksDB(stocksList)
  }
function searchHandler(){
  var input = (document.getElementById('symbolInput') as HTMLButtonElement).value.split(" ")
  fetch(`/api/stocks/prediction?prediction=${input}`,{
    method:"GET",
    headers:{
    auth:cookie.get("auth")
    },
  })
  .then((response) => {return response.json()})
  .then((data) => {
    setStockPredictions(data.predictions.map((item) => { return {...item}}))
  })
}

  function addHandler(symbol : string){
    console.log("addHandlerRRRRRRRRRR",symbol)
    let updatedSymbols = stocks.map((stockItem) => {return stockItem.symbol})
    if (symbol in updatedSymbols) {console.log("REPEAT!!!!!!!!!"); return}
    updatedSymbols.push(symbol)
    console.log("uniqueSymbols",updatedSymbols)
    setStockPredictions([])

    fetch(`/api/stocks?options=new&stocks=${symbol}`,{
      method:"GET",
      headers:{auth:cookie.get("auth")},
    })
    .then((response) => {return response.json()})
    .then((data) => {
      if (!data.message){
        var tempStocks = stocks.slice()
        tempStocks = tempStocks.concat({...data.stocks[0],favorited:true})
        console.log("tempStocks.concat(data.stocks)",tempStocks)
        setStocks(tempStocks)
      }
   })
   updateStocksDB([...updatedSymbols])

  }
  function updateStocksDB (newStocks: string[]){
    console.log("Running /api/auth/put, updatedSymbols = ",{email:user.email, stocks: stocks})
    fetch(`/api/stocks`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"},
        body: JSON.stringify({email:user.email, stocks: newStocks})
      })
      .then((response) => {
      })
  }


  function addTrendingHandler(position){
    const symbols = stocks.map((stockItem) => {
      return stockItem.symbol

    })
    console.log("SYMBOLS",symbols,trendingStocks[position].symbol,trendingStocks[position].symbol in symbols)
    if (trendingStocks[position].symbol in symbols){
      return
    }
    setStocks((currentStocks) => {
      const updatedStocks = [...currentStocks,{...trendingStocks[position],favorited:true}]
      const symbols = updatedStocks.map((stockItem) => {return stockItem.symbol})
      updateStocksDB(symbols)
      return updatedStocks
    })
    setTrendingStocks((currentTrending) => {
      currentTrending[position] = {...currentTrending[position],favorited:true}
      return currentTrending
    })
  }
  function handleKeyPress(event){
    if (event.key === 'Enter') {
      searchHandler()
    }
  }
  var i = 0
  var stocksList
  i = 0
  if (dataLoaded && typeof(stocks) != "undefined"){
    stocksList = stocks.map((item) => { //handle getting bad stock data
      return <Stock key={i} position={i++} handler={deleteHandler} favorited={item.favorited} symbol={item.symbol} name={item.name} price={item.price} change={item.change} dayRange={item.dayRange.split(" - ")} ></Stock>
    })
  }
  var trendingList
  var j = 0
  if (dataLoaded && typeof(trendingStocks) != "undefined"){
    trendingList = trendingStocks.map((item) => {
      return <Stock key={++i} position={j++} handler={addTrendingHandler} trending={true} favorited={item.favorited} symbol={item.symbol} name={item.name} price={item.price} change={item.change} dayRange={item.dayRange.split(" - ")} ></Stock>
    })
  }
    
  return (
    <>
      <div className={classes.inputDiv}>
      <i>Enter Tickers to search for equities</i><br/><br/>
        <input onKeyDown={handleKeyPress} className={classes.stocksInput} id="symbolInput" placeholder=""/> 
        <button className={classes.addButton} onClick={searchHandler}>Search</button>
      { stockPredictions.length > 0 && <StockPredictions predictions={stockPredictions} addHandler={(symbol :string) => addHandler(symbol)} closeHandler={() => {setStockPredictions([])}}/> } 
      </div>
      <h1 className={classes.title}>FAVORITED STOCKS</h1>
      <hr className={classes.hr1}/>
      <hr className={classes.hr2}/>
      <hr className={classes.hr3}/>
      <div className={classes.stocksContainer}>
        {dataLoaded && stocksList}
      </div>
      <h1 className={classes.title}>FEATURED STOCKS</h1>
      <hr className={classes.hr1}/>
      <hr className={classes.hr2}/>
      <hr className={classes.hr3}/>
      <i>*crypto not supported</i>
      <div className={classes.stocksContainer}>
        {dataLoaded && trendingList}
      </div>
    </>
  )
}