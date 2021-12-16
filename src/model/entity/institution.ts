import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";

@Entity()
export default class Institution{
    @PrimaryGeneratedColumn()
    institution_id: number;

    @Column({nullable: false, length: 100, type: "varchar"})
    institution: string;
}