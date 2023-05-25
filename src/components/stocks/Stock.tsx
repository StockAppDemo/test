// import Link from 'next/link';
// import classes from './Stock.module.css';
// import Image from 'next/image'

// export default function Stock(props) {
//   // console.log("props = ", props)
//   // console.log((props.price < 0.0 ? "posChange" : "negChange"))
//     return (
//       <>
//       <div className={classes.stockContainer}>
//       {/* <div className={`${classes.navItem} ${classes.navItemDropDown}`}>{props.user} */}

//         <div className={classes.topRow}>
//             <div>
//               <b>{props.symbol}</b>
//               {props.change >= 0 &&
//               <Image className={classes.changeImage} src="/pos-change.png" alt="" height={15} width={45}/>
//               ||
//               <Image className={classes.changeImage} src="/neg-change.png" alt="" height={15} width={45}/>
//               }
//             </div> 
//             {/* <div>  */}
//               {props.trending && props.favorited || // remove button if stock is favorited and in trending list
//                 props.favorited &&
//                   <button onClick={() => props.handler(props.position)} className={classes.delete}>X</button>
//                 ||<button onClick={() => props.handler(props.position)} className={classes.delete}>+</button>
//               }
//             {/* </div> */}
//           </div>
//             {/* <hr className={classes.hr1}></hr> */}
//             <div>${props.price}</div>
//             <div className={(props.change < 0 ? classes.negChange : classes.posChange)}>{Math.round(props.change * 100) / 100}%</div>
//           <div className={classes.rightContainer}>
//             <div>Low / High <br></br> {props.dayRange}</div>
//           </div>
//         </div>
//         <div className={classes.row}>
//           <div className={classes.name}>{props.name}</div>
//         </div>
//         <div className={classes.row}>
//         {/* <button className={classes.moreInfoButton}><Link href={`/stocks/${props.symbol}`}><a className={classes.moreInfoLink}>More Info</a></Link></button> */}
//         <Link href={`/stocks/${props.symbol}`}passHref><button className={classes.moreInfoButton}>More Info</button></Link>
//         </div>
//       </>
//     )
//   }
  


  import Link from 'next/link';
import classes from './Stock.module.css';
import Image from 'next/image'

export default function Stock(props) {
  // console.log(props.dayRange[0].toFixed(2))
  // console.log("props = ", props)
  // console.log((props.price < 0.0 ? "posChange" : "negChange"))
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
            // props.favorited &&
              // <input type="image" onClick={() => props.handler(props.position)} className={classes.delete}><Image src="/x.png" alt="" height={30} width={30}></Image></input>
            //   <div className={classes.buttonDiv}><button onClick={() => props.handler(props.position)} className={classes.addDeleteButton}><Image src="/x.png" alt="" height={30} width={30}/></button></div>
            // ||<div className={classes.buttonDiv}><button onClick={() => props.handler(props.position)} className={classes.addDeleteButton}><Image src="/+.png" alt="" height={30} width={30}/></button></div>
            <div className={classes.buttonDiv}><button onClick={() => props.handler(props.position)} className={classes.addDeleteButton}><Image src={props.favorited ? "/x.png" : "/+.png"} alt="" height={30} width={30}/></button></div>
            // ||
            // <div className={classes.buttonDiv}><button onClick={() => props.handler(props.position)} className={classes.addDeleteButton}><Image src="/+.png" alt="" height={30} width={30}/></button></div>
          }
            <span>Low / High <br/> {parseFloat(props.dayRange[0]).toFixed(2)} - {parseFloat(props.dayRange[1]).toFixed(2)}</span>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.name}><b>{props.name}</b></div>
        </div>
        <div className={classes.row}>
          {/* <button className={classes.moreInfoButton}><Link href={`/stocks/${props.symbol}`}><a className={classes.moreInfoLink}>More Info</a></Link></button> */}
          <Link href={`/stocks/${props.symbol}`}passHref><button className={classes.moreInfoButton}>More Info</button></Link>
        </div>
      </div>
      </>
    )
  }
  