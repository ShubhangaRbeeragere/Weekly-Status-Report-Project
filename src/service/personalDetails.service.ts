import {getManager} from "typeorm";
import {Response, Request, application} from "express";
import PersonalData from "../model/entity/personalData";
import PhoneNumber from "../model/entity/phoneNumber"
import * as personalLayout from "../interface/personalDetails.interface";

///testing////////////////////////

////testing///////////////////////
//function to get all the details of the employees from the database//////////////////////
export const getAll = async(req: Request, res: Response) =>{
    let dataManager = getManager();
    let receivedData = await dataManager.find(PersonalData); 
    // console.log(receivedData);
    res.status(200).send(receivedData);
}

//function to get single details from the database;//////////////////////
export const getOnly = async(req: Request, res: Response) => {
    const personalId: number = parseInt(req.query.id as string);
    // console.log(personalId);

    let dataManager = getManager();
    try{
        let findData = await dataManager.findOne(PersonalData, personalId); 
        if(findData === undefined){
            throw new Error("Data Dosen't Exist");
        }
        res.status(200).send(findData);
    }
    catch(error: any){
        // console.log(error.message);
        res.status(400).send(error.message);
    };
}


//function for adding the data to the table//////////////////////
export const addData = async(req: Request, res: Response) => {
    const receivedData: personalLayout.personalData = req.body; 
    console.log("data ", receivedData);

    //create a manager to store data
    let manager = getManager();
    let applicantDetails = new PersonalData();
    //applicant_details table data
    applicantDetails.address = receivedData.address;
    applicantDetails.applicant_name = receivedData.applicantName;
    applicantDetails.email_address = receivedData.emailAddress;
    applicantDetails.address = receivedData.address;
    applicantDetails.applied_date = receivedData.appliedDate;
    applicantDetails.applied_position = receivedData.appliedPosition;
    applicantDetails.available_from = receivedData.availableFrom;
    try{

        let checkDetails = await manager.findOne(PersonalData, {email_address: receivedData.emailAddress})
        if(checkDetails){
            throw new Error("POST: User Already Exists");
        }
        await manager.save(applicantDetails);

        //phone_number table data
        receivedData.phoneNumber.forEach(async(phone) => {
            let phoneDetails = new PhoneNumber();
            phoneDetails.phone_number = phone.number;
            phoneDetails.personalDataFk = applicantDetails;
            await manager.save(phoneDetails);
        })
 
        console.log("data saved successfuly");
        res.status(200).send("POST: Data Saved");
    }
    catch(error: any){
        console.log("error: ", error.message);
        res.status(400).send(error.message);
    }
    
   // console.log("after: ",insertData);
    /*
    try{
        let manager = getManager();
        let checkDetails = await manager.findOne(PersonalData, {email_address: receivedData.emailAddress})
        if(checkDetails){
            throw new Error("POST: Data Already Exists");
        }
        await manager.save(applicantDetails);
        console.log("data saved successfuly");
        res.status(200).send("POST: Data Saved");
    }
    catch(error: any){
        console.log("error: ", error.message);
        res.status(400).send(error.message);
    }
    */
}

//update the data in the database/////////////////////////////////////
export const updateData = async(req: Request, res: Response) => {
    let receivedData: personalLayout.personalData = req.body;
    let manager = getManager();
    try{
        let updateDetails = await manager.findOne(PersonalData,
            {
                applicant_name: receivedData.applicantName,
                email_address: receivedData.emailAddress
            });
        if(updateDetails === undefined){
            throw new Error("PUT: Data Doesn't Exist");
        }

        updateDetails.address = receivedData.address;
        updateDetails.applicant_name = receivedData.applicantName;
        updateDetails.email_address = receivedData.emailAddress;
        updateDetails.address = receivedData.address;
        updateDetails.applied_date = receivedData.appliedDate;
        updateDetails.applied_position = receivedData.appliedPosition;
        updateDetails.available_from = receivedData.availableFrom;

        await manager.save(updateDetails);
        // console.log("update data: ",updateDetails);

        console.log("Data Updated");
        res.status(200).send("PUT: Data Updated");
    }
    catch(error: any){
        res.status(400).send(error.message);
        console.log(error.message);
    }
}

//delete data from the database //////////////////////////////
export const deleteData = async(req: Request, res: Response) => {
    let receivedData: personalLayout.mailAndName = req.body;
    let manager = getManager();
    try{
        let deleteDetails = await manager.findOne(PersonalData,
            {
                applicant_name: receivedData.applicantName,
                email_address: receivedData.emailAddress
            });
        if(deleteDetails === undefined){
            throw new Error("DELETE: Data Doesn't Exist");
        }
        await manager.remove(deleteDetails);
        // console.log("update data: ",updateDetails);

        console.log("Data Deleted");
        res.status(200).send("PUT: Data Deleted");
    } 
    catch(error: any){
        res.status(400).send(error.message);
        console.log(error.message);
    }
}