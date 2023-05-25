import { ALPHAVANTAGEAPI, MARKETAUXTOKEN, CLOUDINARYCONFIG } from "../../../src/api/secret";
import { authenticated } from "../../../src/api/authenticated";
import { v2 as cloudinary } from 'cloudinary'

export default authenticated(async function getStockDetails(req, res) {
  var id = req.url.split('/')[3];
    console.log(0)
  const detailsPromise = fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${id}&apikey=${ALPHAVANTAGEAPI}`)
  .then(response => response.json())
  var newsData = await fetch(`https://api.marketaux.com/v1/news/all?symbols=${id}&api_token=${MARKETAUXTOKEN}&filter_entities=true&group_similar=true&language=en&min_match_score=50`).then(response => response.json());
  newsData = newsData.data;
  console.log(1)

  cloudinary.config(CLOUDINARYCONFIG)
  const newsPromise = newsData.map(item => {
    return cloudinary.uploader.upload(item.image_url, { public_id: item.uuid, tags: 'express_sample' })
      .then(function (data) {
        return { ...item, image_url: data.url, image_width: data.width, image_height: data.height };
      });
  });
  console.log(2)

  const detailsData = await detailsPromise;
  const uploadedData = await Promise.all(newsPromise);
  console.log(3)

  console.log("about to send");
  res.status(200).send({ news: uploadedData, details: detailsData });
});