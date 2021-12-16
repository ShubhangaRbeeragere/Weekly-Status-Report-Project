import { getManager } from "typeorm";
import { Request, Response } from "express";
import ApplicantDetails from "../model/entity/applicantDetails";
import Degree from "../model/entity/degree";
import Institution from "../model/entity/institution";
import PhoneNumber from "../model/entity/phoneNumber";
import Specialization from "../model/entity/specialization";
import PreviousEmployment from "../model/entity/previousEmployment";
import Bridge from "../model/entity/bridge";


import * as applicantDetailsLayout from "../interface/applicantDetails.interface";

//get all the data from the database
export const getAll = () => {

}

//get only one employee's data from the database
export const getOnly = () => {

}

//add the data of an employee to the database
/*
    insertion schema
    1.applicantDetails
    2.phoneNumber
    3.previousEmployment
    4.instition
    5.degree
    6.specialization
    7.bridge
*/
export const addData = async(req: Request, res: Response) => {
    let manager = getManager();
    const receivedData: applicantDetailsLayout.applicantDetails = req.body;
    const personalData = receivedData.personalDetails;
    const employmentData = receivedData.previousEmployment;
    const education = receivedData.education;
//////////////////////1>>>>>>> add the personal details to the table ApplicantDetails and PhoneNumber//////////////////// 
   try{

        //check if data already exists
        let checkApplicant = await manager.findOne(ApplicantDetails,
            {email_address: personalData.emailAddress})

        if(checkApplicant){
            throw new Error("POST: user already exists");
        }

        let applicantDetails = new ApplicantDetails();
        applicantDetails.applicant_name = personalData.applicantName;
        applicantDetails.applied_position = personalData.appliedPosition;
        applicantDetails.applied_date = personalData.appliedDate;
        applicantDetails.email_address = personalData.emailAddress;
        applicantDetails.address = personalData.address;
        applicantDetails.available_from = personalData.availableFrom;

        //save applicantDetails
        await manager.save(applicantDetails);

        //add phone details///////////////////////////////////////////////
        let phoneData = personalData.phone;
        phoneData.forEach(async(phone) => {
            let phoneDetails = new PhoneNumber();  
            phoneDetails.phone_num = phone.number;
            phoneDetails.applicant_id_fk = applicantDetails;
            await manager.save(phoneDetails);
        })

///////////////2>>>>>>>>>>>>>>>>>previous employment details///////////////////////////////////////////
        employmentData.forEach(async(employment) => {
           let  previousEmployment = new PreviousEmployment();
           previousEmployment.company_name = employment.company;
           previousEmployment.position = employment.position;
           previousEmployment.start_date = employment.startDate;
           previousEmployment.end_date = employment.endDate;
           previousEmployment.applicant_id_fk = applicantDetails;
           await manager.save(previousEmployment);
        })
        let previousEmployment = new PreviousEmployment();
        console.log("POST: saved user succesfully");
        res.status(400).send("POST: data saved successfully");
   }
   catch(error: any){
       console.log(error.message);
       res.status(200).send(error.message);
   }
}

//update the data of the employee in the database
export const updateData = () => {

}

//delete the data of the employee in the database
export const deleteData = () => {

}