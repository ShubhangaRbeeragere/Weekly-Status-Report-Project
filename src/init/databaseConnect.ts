import {createConnection} from "typeorm"
import PersonalDetails from "../model/entity/personalData"
import PhoneNumber from "../model/entity/phoneNumber"; 
import PreviousEmployment from "../model/entity/previousEmployment";
import institution from "../model/entity/institution";
import degree from "../model/entity/degree";
import specialization from "../model/entity/specialization";


const connect = createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345678",
    database: "dummy",
    entities: [
        PersonalDetails,
        PhoneNumber,
        PreviousEmployment,
        institution,
        degree,
        specialization
    ],
    synchronize: true
})

export default connect;