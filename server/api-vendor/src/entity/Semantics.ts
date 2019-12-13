import {Entity,PrimaryGeneratedColumn,Column,EventSubscriber,EntitySubscriberInterface,InsertEvent, BaseEntity, BeforeInsert, BeforeUpdate, AfterInsert, AfterUpdate} from "typeorm";
import emitter from '../emitters'

@Entity()
export class Semantics {    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column()
    hits: number;

    //@AfterInsert()
    @AfterUpdate()
    async updated() { 
        emitter.emit('update')
    }
    


}