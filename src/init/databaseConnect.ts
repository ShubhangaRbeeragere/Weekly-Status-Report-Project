import {createConnection} from "typeorm"
import ApplicantDetails from "../model/entity/applicantDetails";
import Degree from "../model/entity/degree";
import Institution from "../model/entity/institution";
import PhoneNumber from "../model/entity/phoneNumber";
import Specialization from "../model/entity/specialization";
import PrviousEmployment from "../model/entity/previousEmployment";
import Bridge from "../model/entity/bridge";
import { application } from "express";

const connect = createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345678",
    database: "dummy",
    entities: [
        ApplicantDetails,
        Degree,
        Institution,
        PhoneNumber,
        Specialization,
        PrviousEmployment,
        Bridge
    ],
    synchronize: true
})

export default connect;