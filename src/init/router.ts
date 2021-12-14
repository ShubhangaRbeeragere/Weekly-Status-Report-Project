import express from "express";
import personalDetailsRouter from "../router/personalDetails.router"

let mainRouter = express.Router();
mainRouter.use("/personalInfo", personalDetailsRouter);

export default mainRouter;

