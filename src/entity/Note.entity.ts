import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Note{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title:string;
    @Column()
    content:string;
    @CreateDateColumn()
    createdAt: Date;
    @ManyToOne(() => User, (user: User) => user.notes)
    user: User;
}