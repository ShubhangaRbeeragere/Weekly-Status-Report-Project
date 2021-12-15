import express from "express";
import personalDetailsRouter from "../router/personalDetails.router"

let mainRouter = express.Router();
mainRouter.use("/personalInfo", personalDetailsRouter);
// mainRouter.use("/Education")
// mainRouter.use("/previousEmployment")

export default mainRouter;

