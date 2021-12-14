import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class PersonalDetails{
    @PrimaryGeneratedColumn()
    applicant_id: number

    @Column({nullable: false, length: 100, type: "varchar"})
    applicant_name: string

    @Column({nullable: false, length: 100, type: "varchar"})
    email_address: string

    @Column({nullable: false, length: 200, type: "varchar"})
    address: string

    @Column({nullable: false, type: "date"})
    applied_date: string

    @Column({nullable: false, length: 100, type: "varchar"})
    applied_position: string

    @Column({nullable: false, type: "date"})
    available_from: string
}