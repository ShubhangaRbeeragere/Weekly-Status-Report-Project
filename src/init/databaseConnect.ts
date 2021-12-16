import {createConnection} from "typeorm"
import PersonalDetails from "../model/entity/personalData"
import PhoneNumber from "../model/entity/phoneNumber"; 
import PreviousEmployment from "../model/entity/previousEmployment";

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
        PreviousEmployment
    ],
    synchronize: true
})

export default connect;