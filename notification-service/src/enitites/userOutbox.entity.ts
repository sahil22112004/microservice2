import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum orderStatus {
    pending = 'pending',
    published = 'published',
}

@Entity('usersOutbox')
export class UserOutbox {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'jsonb' })
    payload: any;

    @Column({
        type: 'enum',
        enum: orderStatus,
        default: orderStatus.pending
    })
    status: orderStatus

}