import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
@ObjectType()
export class Pet{
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;
    
    @Column()
    @Field()
    name: string;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field({nullable: true})
    createdAt?: Date;

    @Column({nullable: true})
    @Field({nullable: true})
    type?: string;
}