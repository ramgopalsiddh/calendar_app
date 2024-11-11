// src/event/event.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  date: string;  // Store date as string (e.g., YYYY-MM-DD)

  @Column()
  time: string;  // Store time as string (e.g., HH:mm)
}
