
import express from "express";
import * as services from "../service/educationDetails.service";

const router = express.Router();
router.post("/addData", services.addData);

export default router;