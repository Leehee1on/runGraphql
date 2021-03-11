import express from "express";
import content from "../controllers/ContentController";

const router = express.Router();

router.post("/register", content.register);

router.get("/list", content.list);

router.get("/perList", content.perList);

router.get("/totalPage", content.totalPage);

// router.delete("/delete/:_id", todo.delete);

// router.put("/edit/:id", todo.edit);

module.exports = router;
