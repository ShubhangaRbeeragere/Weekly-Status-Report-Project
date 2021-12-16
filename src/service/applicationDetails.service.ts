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
export const getAll = async(req: Request, res: Response) => {
    try{
        let data = await getManager().find(Bridge, {relations: ["applicant_id_fk", "institution_id_fk", "degree_id_fk", "course_id_fk"]})
        res.send(data);
    }
    catch(error: any){
        console.log(error.message);
        res.status(400).send(error.message);
    }
    
}

//get only one employee's data from the database
export const getOnly = () => {

}

//add the data of an employee to the database
/*
Insertion schema for database
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
    const educationData = receivedData.education;
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

//////////////3>>>>>>>>>>>>>>>>>Education details///////////////////////////////////////////////////////
        educationData.forEach(async(education) => {
            let institution = new Institution();
            let degree = new Degree();
            let specialization = new Specialization();
            let bridge = new Bridge;

            //save education
            let checkDegree = await manager.findOne(Degree, {degree: education.degree});
            let checkInstitution = await manager.findOne(Institution, {institution: education.institution});
            let checkCourse = await manager.findOne(Specialization, {course: education.specialization});

            //check if already exists, if not save it.
            //also save the foreign keys in bridge table w.r.t 'check' datas
            if(!checkInstitution){
                institution.institution = education.institution;
                await manager.save(institution); 
                bridge.institution_id_fk = institution;
            }
            else{
                bridge.institution_id_fk = checkInstitution;
            }

            if(!checkDegree){
                degree.degree = education.degree;
                await manager.save(degree);
                bridge.degree_id_fk = degree;
            }
            else{
                bridge.degree_id_fk = checkDegree;
            }

            if(!checkCourse){
                specialization.course = education.specialization;
                await manager.save(specialization);
                bridge.course_id_fk = specialization;
            }
            else{
                bridge.course_id_fk = checkCourse;
            }
            //save dates
            bridge.start_date = education.startDate;
            bridge.end_date = education.endDate;
            //save application foreign key in bridge table
            bridge.applicant_id_fk = applicantDetails;

            await manager.save(bridge);
            // let institution_id_fk = await manager.findOne(Institution, {institution: education.institution});
            // let degree_id_fk = await manager.findOne(Degree, {degree: education.degree});
            // let course_id = await manager.findOne(Specialization, {course: education.specialization});
        })
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