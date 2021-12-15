import {createConnection} from "typeorm"
import PersonalDetails from "../model/entity/personalData"
import PhoneNumber from "../model/entity/phoneNumber"; 

const connect = createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345678",
    database: "dummy",
    entities: [
        PersonalDetails,
        PhoneNumber
    ],
    synchronize: true
})

export default connect;