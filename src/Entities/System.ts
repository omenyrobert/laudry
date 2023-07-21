import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity,
} from "typeorm";

@Entity()
export class System extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @Column({ default: true})
  active!: boolean;

}

export const getActiveDate = async () => {
  const activeDate = await System.findOne({ where: { active: true } });
  return activeDate;
}

export const setDate = async (date: string) => {
  const activeDate = await System.findOne({ where: { active: true } });
  if (activeDate) {
    activeDate.date = new Date(date);
    await activeDate.save();
  } else {
    const newDate = new System();
    newDate.date = new Date(date);
    newDate.active = true;
    await newDate.save();
  }
}

export const deactivateDate = async () => {
  const activeDate = await System.findOne({ where: { active: true } });
  if (activeDate) {
    activeDate.active = false;
    await activeDate.save();
  }
}
