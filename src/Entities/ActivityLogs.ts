import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
} from "typeorm";

@Entity()
export class ActivityLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  action: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  timestamp: Date;
}

export const saveActivityLog = async (
  userId: number,
  action: string,
  description?: string
) => {
  const log = await ActivityLog.insert({ userId, action, description });
  return log;
};

export const fetchActivityLog = async () => {
  const logs = await ActivityLog.find();
  return logs;
};
