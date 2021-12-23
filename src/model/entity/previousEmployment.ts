import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import PersonalDetails from "./applicantDetails";


@Entity()
export default class PreviousEmployment{
    @PrimaryGeneratedColumn()
    company_id: number;

    @Column({type: "varchar", length: 100, nullable: false})
    company_name: string;

    @Column({type: "varchar", length: 100, nullable: false})
    position: string;

    @Column({type: "date", nullable: false})
    start_date: string;

    @Column({type: "date", nullable: false})
    end_date: string;

    @ManyToOne(type => PersonalDetails, personalDetails => personalDetails.employment_key)
    @JoinColumn()
    applicant_id_fk: PersonalDetails;
}
