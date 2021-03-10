import express from "express";
import user from "../controllers/UserController";

const router = express.Router();

router.post("/register", user.register);

router.get("/list", user.list);

router.delete("/delete/:id", user.delete);

router.post("/detail", user.detail);

router.post("/edit/:id", user.search);

module.exports = router;
