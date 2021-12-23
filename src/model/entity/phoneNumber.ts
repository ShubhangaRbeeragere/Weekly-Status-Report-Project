import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import ApplicantDetails from "./applicantDetails";


@Entity()
export default class PhoneNumber{
    @PrimaryGeneratedColumn()
    phone_id: number;

    @Column({type: "varchar", length: 14, nullable: false})
    phone_num: string;

    @ManyToOne(type => ApplicantDetails, applicantdetails => applicantdetails.phone_key)
    @JoinColumn()
    applicant_id_fk: ApplicantDetails;
    
}