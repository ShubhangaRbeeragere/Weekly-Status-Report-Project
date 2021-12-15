import express from "express";
import personalDetailsRouter from "../router/personalDetails.router";
import previousEmployementRouter from "../router/previousEmployment.router";

const mainRouter = express.Router();
mainRouter.use("/personalInfo", personalDetailsRouter);
mainRouter.use("/employment", previousEmployementRouter);
// mainRouter.use("/Education")

export default mainRouter;

