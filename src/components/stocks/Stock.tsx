import Link from 'next/link';
import classes from './Stock.module.css';
import Image from 'next/image'

export default function Stock(props) {
    return (
      <>
      <div className={classes.stockContainer}> 
        <div className={classes.row}>
          <div className={classes.leftContainer}>
            <div><span className={classes.ticker}><b>{props.symbol}</b></span>
                <Image className={classes.changeImage} src={props.change >= 0 ? "/pos-change2.png" : "/neg-change.png"} alt="" height={15} width={45}/>
            </div>
            <div>${props.price.toFixed(2)}</div>
            <div className={(props.change < 0 ? classes.negChange : classes.posChange)}>{Math.round(props.change * 100) / 100}%</div>
          </div>
          <div className={classes.rightContainer}>
          {props.trending && props.favorited || // remove add button if stock is favorited and in trending list
            <div className={classes.buttonDiv}><button onClick={() => props.handler(props.position)} className={classes.addDeleteButton}><Image src={props.favorited ? "/x.png" : "/+.png"} alt="" height={30} width={30}/></button></div>
          }
            <span>Low / High <br/> {parseFloat(props.dayRange[0]).toFixed(2)} - {parseFloat(props.dayRange[1]).toFixed(2)}</span>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.name}><b>{props.name}</b></div>
        </div>
        <div className={classes.row}>
          <Link href={`/stocks/${props.symbol}`}passHref><button className={classes.moreInfoButton}>More Info</button></Link>
        </div>
      </div>
      </>
    )
  }
  