
import {getManager} from "typeorm";
import {Response, Request, application} from "express";
import PersonalData from "../model/entity/personalData";

export const addData = (req: Request, res: Response) => {
    res.send("ok");
}