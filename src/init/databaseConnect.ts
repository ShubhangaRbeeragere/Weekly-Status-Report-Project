import {createConnection} from "typeorm"
import personalDetails from "../model/entity/personalData"

const connect = createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345678",
    database: "dummy",
    entities: [personalDetails],
    synchronize: true
})

export default connect;