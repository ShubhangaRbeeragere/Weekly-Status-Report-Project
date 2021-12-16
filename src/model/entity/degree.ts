
import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import personalData from "./personalData";
@Entity()
export default class EducationDetails{
    @PrimaryGeneratedColumn()
    degree_id: number;

    @Column({nullable: false, length: 100, type: "varchar"})
    degree_name: string;
}