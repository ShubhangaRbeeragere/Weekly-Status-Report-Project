import {getManager} from "typeorm";
import {Response, Request} from "express";
import PersonalData from "../model/entity/personalData";
import PhoneNumber from "../model/entity/phoneNumber"
import * as layout from "../interface/personalDetails.interface";


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
    const receivedData: layout.personalData = req.body; 

    let insertData = new PersonalData();
    console.log("before: ", receivedData);
    insertData.address = receivedData.address;
    insertData.applicant_name = receivedData.applicantName;
    insertData.email_address = receivedData.emailAddress;
    insertData.address = receivedData.address;
    insertData.applied_date = receivedData.appliedDate;
    insertData.applied_position = receivedData.appliedPosition;
    insertData.available_from = receivedData.availableFrom;

    // console.log("after: ",insertData);

    try{
        let manager = getManager();
        let checkDetails = await manager.findOne(PersonalData, {email_address: receivedData.emailAddress})
        if(checkDetails){
            throw new Error("POST: Data Already Exists");
        }
        await manager.save(insertData);
        console.log("data saved successfuly");
        res.status(200).send("POST: Data Saved");
    }
    catch(error: any){
        console.log("error: ", error.message);
        res.status(400).send(error.message);
    }
}

//update the data in the database/////////////////////////////////////
export const updateData = async(req: Request, res: Response) => {
    let receivedData: layout.personalData = req.body;
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
    let receivedData: layout.mailAndName = req.body;
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