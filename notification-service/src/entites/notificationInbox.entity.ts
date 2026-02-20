import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum InboxStatus {
    pending = 'pending',
    consumed = 'consumed',
}

@Entity('notificationInbox')
export class NotificationInbox {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'jsonb' })
    message: any;

    @Column({
        type: 'enum',
        enum: InboxStatus,
        default: InboxStatus.pending
    })
    status: InboxStatus

}