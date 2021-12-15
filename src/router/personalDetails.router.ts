import express from "express";
import * as services from "../service/personalDetails.service";

const router = express.Router();

router.get("/getAll", services.getAll);
router.get("/getOnly", services.getOnly);
router.post("/addData", services.addData);
router.put("/updateData", services.updateData);
router.delete("/deleteData", services.deleteData);

export default router;