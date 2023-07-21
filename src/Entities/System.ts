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

  @Column({ default: true})
  active!: boolean;

  @Column()
  token!: string;

}

export const getActiveToken = async () => {
  const activeDate = await System.findOne({ where: { active: true } });
  return activeDate;
}

export const setDate = async (date: string) => {
  const activeDate = await System.findOne({ where: { active: true } });
  if (activeDate) {
    activeDate.token = date;
    await activeDate.save();
  }  else {
    const newDate = new System();
    newDate.token = date;
    await newDate.save();
  }
}



