import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { Staff } from "./Staff";

@Entity()
export class ActivityLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Staff, { onDelete: "SET NULL", eager: true })
  staff: Staff;

  @Column()
  action: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  timestamp: Date;
}

// activityLog.ts
export const saveActivityLog = async (
  staffId: number,
  action: string,
  description?: string
) => {
  const staff = await Staff.findOne({ where: { id: staffId } });
  if (!staff) throw new Error("Staff not found");

  const log = await ActivityLog.insert({
    staff,
    action,
    description,
  });

  return log;
};

export const fetchActivityLog = async () => {
  return await ActivityLog.find({
    order: {
      timestamp: "DESC",
    },
  });
};
