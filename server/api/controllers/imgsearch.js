import History from "../models/history"
import axios from "axios"

let imgSearchController = {}

imgSearchController.search = async (req, res, next) => {
  let q = req.params.q || null
  let offset = req.query.offset || 1

  if (!q) {
    res.json({
      error: {
        message: "invalid search query"
      }
    })
  }

  if (isNaN(offset)) {
    res.json({
      error: {
        message: "invalid offset value"
      }
    })
  }

  const history = new History({term:q})
  await history.save()

  let response = await axios.get(
    `https://www.googleapis.com/customsearch/v1?key=${
      process.env.GOOGLE_API_KEY
    }&cx=${process.env.GOOGLE_CX}&searchType=image&start=${offset}&q=${q}`
  )

  let data = response.data.items
  let result = []
  data.forEach(element => {
    result.push({
      url: element.link || null,
      snippet: element.snippet || null,
      thumbnail: element.image.thumbnailLink || null,
      context: element.image.contextLink || null
    })
  })
  res.json(result)
}

imgSearchController.getLatest = async (req, res, next) => {
  const latest = await History.find({},{_id:false,__v:false})
    .limit(10)
    .sort({ when: "desc" })
  res.status(200).send(latest)
}

export default imgSearchController
