import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Note } from "./Note.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password:string;
    @Column()
    email:string;
    @OneToMany(()=>Note,(note)=>note.user)
    notes: Note[];
    @Column()
    refreshToken: string;

}