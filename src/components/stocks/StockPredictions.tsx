
import Image from "next/image"
import classes from './StockPredictions.module.css';
import prediction from "pages/api/stocks/prediction";

export default function StockPredictions(props) {

  function closePredictions(){
    console.log("closePredictions")
  }

  var i = 0;
  const predictionList = props.predictions.map((prediction) => { return <Prediction addHandler={props.addHandler} key={i++} prediction={prediction}/>})
  console.log("predictionList = ", predictionList)
  return (
    <>
        <div className={classes.predictionsContainer}>
            {predictionList}
        <button className={classes.closeButton} onClick={props.closeHandler}>Close</button>
        </div>
     </>
      )
    }

    function Prediction(props){
    return (
        <div onClick={() => props.addHandler(props.prediction["1. symbol"])} className={classes.item}>
          <div><b>{props.prediction["1. symbol"]}</b></div>
          <div>{props.prediction["2. name"]}</div>
        </div>
    )
    }