import express from "express";
import applicationDetails from "../router/applicantDetails.router"

let mainRouter = express.Router();
mainRouter.use("/applicantDetails", applicationDetails);

export default mainRouter;

