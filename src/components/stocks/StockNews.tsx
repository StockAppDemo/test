
import Image from "next/image"
import classes from './StockNews.module.css';

export default function StockNews(props) {
    // console.log("props = ", props)
    // console.log((props.price < 0.0 ? "posChange" : "negChange"))
      return (
        <div className={classes.newsContainer}>
            <a className={classes.anchor} href={props.url} target="_blank" rel="noreferrer">
                <div className={classes.container}>
                    {/* <Image src={props.image_url} width={100} height={100} alt="" /> */}
                    <Image className={classes.newsImage}src={props.image_url} height={200} width={Math.floor((props.image_width / props.image_height) * 200)} alt="News Article" />
                    <div className={classes.details}>
                        <h2 className={classes.leftAlign}>{props.title}</h2>
                        <p className={classes.leftAlign}>{props.description}</p>
                        {/* <div>{props.snippet}</div> */}
                        <p><i>{props.source}</i></p>
                        <p>{new Date(props.published_at).toDateString()} UTC</p>
                    </div>
                </div>
            </a>
            <hr className={classes.hLine}></hr>
        </div>
      )
    }