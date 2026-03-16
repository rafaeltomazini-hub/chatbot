import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    text!: string;

    @Column({ type: "text", nullable: true })
    response!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => User, (user) => user.id)
    user!: User;
}
