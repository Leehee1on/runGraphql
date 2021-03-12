import express from "express";
import content from "../controllers/ContentController";

const router = express.Router();

router.post("/register", content.register);

router.get("/list", content.list);

router.post("/perList", content.perList);

router.post("/totalPage", content.totalPage);

router.get("/detail/:content_no", content.detail);

router.put("/delete/:content_no", content.delete);

router.put("/edit/:content_no", content.edit);

module.exports = router;
