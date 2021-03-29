import express from "express";
import comment from "../controllers/CommentController";

const router = express.Router();

router.post("/register", comment.register);

router.get("/list", comment.list);

router.post("/perList", comment.perList);

router.post("/totalPage", comment.totalPage);

router.put("/edit/:comment_no", comment.edit);

router.put("/delete/:comment_no", comment.delete);

module.exports = router;
