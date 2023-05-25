import cookie from "js-cookie"
import Link from 'next/link';
import Image from 'next/image'

import { useState, useEffect } from 'react';
import Stock from "./Stock";
import classes from './TrendingStocks.module.css';
import myFetch from '../../utils/myFetch'
import {ROOTDIR} from '../../api/secret'

export default function TrendingStocks(props) {
  const [dataLoaded,setDataLoaded] = useState(false)
  const [trendingStocks,setTrendingStocks] = useState([])

  useEffect(() => { // Get Data
      const authCookie = cookie.get("auth") 
      const data = myFetch(`${ROOTDIR}/api/stocks/trending`,{
        method: "GET",
        headers: {
          auth: authCookie
        }})
        .then((data) => {
          if (Object.keys(data).length === 0){
            return
          }
          // setUser(data.user)
          // setStocks(() => {
          //   return data.stocks.map((item) => {
          //     return {...item,favorited:true}
          //   })
          // })
          // const tickers = data.stocks.map((stockItem) => {return stockItem.symbol})
          setTrendingStocks(data.trending)
          // setTrendingStocks((item) => {
          //   return data.trending.map((item) => {
          //     return item.symbol in tickers ? {...item,favorited:false} : item
          //   })
          // })
          setDataLoaded(true)
        })
    },[]);

    function addTrendingHandler(position){
      //fix putting 'any' type in list
      // (23) ['BTC-USD', 'UPST', 'TWTR', 'LEVI', 'AMC', 'NVAX', 'AFRM', 'MARA', 'AI', 'ETH-USD', 'ANY', 'GROV', 'BTC-CAD', 'SOFI', 'CHPT', 'USEA', 'MSTR', 'SOLO', 'SRG', 'AVLR', 'UPST', 'UPST', 'UPST']
      // var input = (document.getElementById('symbolInput') as HTMLInputElement).value.split(" ")
      const symbols = trendingStocks.map((stockItem) => {
        // console.log(stockItem)
        return stockItem.symbol
  
      })
      console.log("SYMBOLS",symbols,trendingStocks[position].symbol,trendingStocks[position].symbol in symbols)
      if (trendingStocks[position].symbol in symbols){
        console.log("NO DUPLICATES")
        return
      }
      setTrendingStocks((currentStocks) => {
        // var trending = trendingStoc ks[position]
        return [...currentStocks,{...trendingStocks[position],favorited:true}]
      })
      setTrendingStocks((currentTrending) => {
        currentTrending[position] = {...currentTrending[position],favorited:true}
        return currentTrending
      })
    }

    var trendingList = []
    if (dataLoaded && typeof(trendingStocks) != "undefined"){
      var i = 0
      console.log("INSIDE TRENDINGLIST", trendingStocks)
        trendingList = trendingStocks.map((item) => {
          return <Stock key={++i} position={++i} handler={addTrendingHandler} trending={true} symbol={item.symbol} name={item.name} price={item.price} change={item.change} dayRange={item.dayRange.split(" - ")} ></Stock>
          // return <Stock key={++i} position={j++} handler={addTrendingHandler} trending={true} favorited={item.favorited} symbol={item.symbol} name={item.name} price={item.price} change={item.change} dayRange={item.dayRange.split(" - ")} ></Stock>
        })
      }

    return (
      <>
      <div> 
        <h1 className={classes.title}>FEATURED STOCKS</h1>
        <hr className={classes.hr1}/>
        <hr className={classes.hr2}/>
        <hr className={classes.hr3}/>
        <i>*crypto not supported</i>
        <div className={classes.stocksContainer}>
            {dataLoaded && trendingList}
        </div>
      </div>
      </>
    )
  }