import { Entity, ObjectID, ObjectIdColumn, Column, BeforeInsert, BeforeUpdate, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true })
    public name: string;

    @Column()
    public email: string;

    @Column()
    public telephone: number;

    @Column()
    public isActive: boolean;
}
