import express from "express";
import comment from "../controllers/CommentController";

const router = express.Router();

router.post("/register", comment.register);

router.get("/list", comment.list);

router.get("/perList", comment.perList);

router.get("/totalPage", comment.totalPage);

router.put("/edit/:comment_no", comment.edit);

router.put("/delete/:comment_no", comment.delete);

module.exports = router;
