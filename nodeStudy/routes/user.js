import express from "express";
import user from "../controllers/UserController";

const router = express.Router();

router.post("/signUp", user.register);

router.post("/signIn", user.signIn);

router.post("/refresh", user.refresh);

router.get("/list", user.list);

router.get("/auth", user.auth);

router.delete("/delete/:id", user.delete);

router.post("/detail", user.detail);

router.post("/edit/:id", user.search);

module.exports = router;
