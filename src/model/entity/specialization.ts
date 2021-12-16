import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import personalData from "./personalData";
@Entity()
export default class EducationDetails{
    @PrimaryGeneratedColumn()
    applicant_id: number;

    @Column({nullable: false, length: 100, type: "varchar"})
    applicant_name: string;

    @Column({nullable: false, length: 100, type: "varchar"})
    email_address: string;
}