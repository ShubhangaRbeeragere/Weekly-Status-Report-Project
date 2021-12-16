import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mainRouter from "./init/router"
import connect from "./init/databaseConnect"
import bodyParser from "body-parser";
//testing///////////////////////////////////////////////
import PersonalData from "../src/model/entity/personalData"
import {getManager, getConnection} from "typeorm";
import PersonalDetails from "../src/model/entity/personalData";
//testing\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

dotenv.config();
let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", mainRouter);
//connect to the database and check for errors
connect
.then(
    async() => {
        console.log("connected to the database successfully");
        //testing
        // let data = await getManager().find(PersonalData, {relations: ["companyKey", "phoneKey"]})
        // console.log(data[0].companyKey); 
        // console.log(data[0].phoneKey);
        /*
        let manager = getManager();

        await manager
        .query(
            "ALTER SEQUENCE public.personal_details_applicant_id_seq RESTART WITH 10000;"
        )
        await manager
        .query(
            "UPDATE public.personal_details SET applicant_id = nextval('public.personal_details_applicant_id_seq');"
        )

        await manager
        .query(
            "ALTER SEQUENCE public.personal_details_applicant_id_seq RESTART WITH 1;"
        )

        await manager
        .query(
            "UPDATE public.personal_details SET applicant_id = nextval('public.personal_details_applicant_id_seq');"
        )
        console.log("personal_details_sequence restarted");
        //testing
        */
    } 
)
.catch(
    (error) => {console.log(error.message)}
);

//provide the port details for the http requests
const PORT: number = parseInt(process.env.PORT as string, 10);
app.listen(PORT || 5800, () => {
    console.log(`listening on port http://localhost:${PORT}`);
})