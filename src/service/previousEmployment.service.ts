import {getManager} from "typeorm"
import {Request, Response} from "express"
import PersonalData from "../model/entity/personalData";
import * as employmentLayout from "../interface/previousEmployement.interface"


export const addData = (req: Request, res: Response) => {
    console.log("previous employment");       
    res.send("ok");
}