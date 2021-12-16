import { getManager } from "typeorm";
import { Request, Response } from "express";
import * as applicantDetailsLayout from "../interface/personalDetails.interface";
import ApplicantDetails from "../model/entity/applicantDetails";
import Degree from "../model/entity/degree";
import Institution from "../model/entity/institution";
import PhoneNumber from "../model/entity/phoneNumber";
import Specialization from "../model/entity/specialization";
import PrviousEmployment from "../model/entity/previousEmployment";
import Bridge from "../model/entity/bridge";




//get all the data from the database
export const getAll = () => {

}

//get only one employee's data from the database
export const getOnly = () => {

}

//add the data of an employee to the database
export const addData = () => {

}

//update the data of the employee in the database
export const updateData = () => {

}

//delete the data of the employee in the database
export const deleteData = () => {

}