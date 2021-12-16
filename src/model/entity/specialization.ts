import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";

@Entity()
export default class Specialization{
    @PrimaryGeneratedColumn()
    course_id: number;

    @Column({nullable: false, length: 100, type: "varchar"})
    course: string;
}