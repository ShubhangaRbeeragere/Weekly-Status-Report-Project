import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import PersonalData from "./personalData"
@Entity()
export default class PhoneNumber{
    @PrimaryGeneratedColumn()
    phone_id: number;

    @Column()
    phone_number: string;

    @OneToOne(type => PersonalData)
    @JoinColumn()
    personalData: PersonalData
}