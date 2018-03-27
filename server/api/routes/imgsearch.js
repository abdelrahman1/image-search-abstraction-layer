import Router from "express-promise-router"
import imgSeachController from "../controllers/imgsearch"

const router = Router()

router.route("/latest").get(imgSeachController.getLatest)

router.route("/:q").get(imgSeachController.search)

export default router
