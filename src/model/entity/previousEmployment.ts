import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import PersonalData from "./personalData"
@Entity()
export default class PreviousEmployment{
    @PrimaryGeneratedColumn()
    company_id: number;

    @Column({type: "varchar", length: 100, nullable: false})
    company_name: string;

    @Column({type: "date", nullable: false})
    start_date: string;

    @Column({type: "date", nullable: false})
    end_date: string;

    @Column({type: "varchar", length: 100, nullable: false})
    position: string;

    @ManyToOne(type => PersonalData)
    @JoinColumn()
    personalDataFk: PersonalData
}