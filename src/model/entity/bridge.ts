
import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";
import ApplicantDetails from "./applicantDetails";
import Degree from "./degree"
import Institution from "./institution";
import Specialization from "./specialization";

@Entity()
export default class Bridge{
    @PrimaryGeneratedColumn()
    bridge_id: number;

    @Column({nullable: false, type: "date"})
    start_date: string;

    @Column({nullable: false, type: "date"})
    end_date: string;

    @ManyToOne(type => ApplicantDetails)
    @JoinColumn()
    applicant_id_fk: ApplicantDetails;
    
    @ManyToOne(type => Institution)
    @JoinColumn()
    institution_id_fk: Institution;

    @ManyToOne(type => Degree)
    @JoinColumn()
    degree_id_fk: Degree;

    @ManyToOne(type => Specialization)
    @JoinColumn()
    course_id_fk: Specialization;
}