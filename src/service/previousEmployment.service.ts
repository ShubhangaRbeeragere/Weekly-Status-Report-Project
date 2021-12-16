import {getManager} from "typeorm"
import {Request, Response} from "express"
import PersonalData from "../model/entity/personalData";
import PreviousEmployment from "../model/entity/previousEmployment";
import * as employmentLayout from "../interface/previousEmployement.interface"

export const addData = async(req: Request, res: Response) => {
    const receivedData: employmentLayout.previousEmployment = req.body;
    
    //check the data from personalDetails for existance;
    try{
        let manager = getManager();
        let applicantData:any = await manager.findOne(PersonalData, 
            {applicant_name: receivedData.applicantName, 
             email_address: receivedData.emailAddress});

        //if data doesn't exist
        if(applicantData === undefined){
            throw new Error("data doesn't exist");
        }
        //add the employee details with 
        //adding the foreignKey in previous_employment
        receivedData.employment.forEach(async(data) => {
            let employment = new PreviousEmployment();
            //check for redundancy of company details
            let checkData = await manager.findOne(PreviousEmployment,
                {company_name: data.companyName,
                 position: data.position,
                 personalDataFk: applicantData.applicant_id});
            if(checkData){
                console.log("already exists");
                return;
            }
            //add the data if it's not duplicate entry
            employment.position = data.position;
            employment.company_name = data.companyName;
            employment.start_date = data.startDate;
            employment.end_date = data.endDate;
            //save reference
            employment.personalDataFk = applicantData;
            await manager.save(employment);
        })

        console.log("POST: employment data added");
        res.status(200).send("POST: employment data added");
}
catch(error: any){
        console.log(error);
        res.status(400).send(error.message);
    }
}