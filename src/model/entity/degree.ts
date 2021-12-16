import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";

@Entity()
export default class Degree{
    @PrimaryGeneratedColumn()
    degree_id: number;

    @Column({nullable: false, length: 100, type: "varchar"})
    degree: string;
}