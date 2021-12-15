import express from "express";
import * as employment from "../service/previousEmployment.service";

const router = express.Router();

router.post("/addData", employment.addData);

export default router;