import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity, 
  In,
  ManyToMany,
  JoinTable
} from "typeorm";
import { ClassLevel } from "./ClassLevel";

@Entity()
export class Division extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  division!: string;

  @Column()
  points!: number;

  @Column({
    nullable: true
  })
  upperLimit!: number;

  @Column({
    nullable: true
  })
  lowerLimit!: number;

  @ManyToMany(() => ClassLevel, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: true,
  })
  @JoinTable({ name: "class_level_divisions" })
  classLevels: ClassLevel[];


}

export const getDivisions = async () => {
  const divisions = await Division.find({
    order: {
      id: "DESC",
    },
  });
  return divisions;
};


export const createDivision = async (
  division: string, 
  points: number,
  upperLimit: null | number = null,
  lowerLimit: null | number = null,
  classLevels: any[] | null | undefined = null
) => {
  const divisionToInsert = new Division();
  divisionToInsert.division = division;
  divisionToInsert.points = points;

  if (upperLimit) {
    divisionToInsert.upperLimit = upperLimit;
  }

  if (lowerLimit) {
    divisionToInsert.lowerLimit = lowerLimit;
  }

  let levels: ClassLevel[] = []
  if (classLevels) {
    classLevels.forEach(async (classLevel) => {
      const level = await  ClassLevel.findOne({ where: { id: classLevel.id } });
      if (level) {
        levels.push(level);
      }
    });
  }

  divisionToInsert.classLevels = levels;


  await divisionToInsert.save();
  return divisionToInsert;
};

export const updateDivision = async (
  id: number, 
  division: string, 
  points: number,
  upperLimit: null | number = null,
  lowerLimit: null | number = null,
  classLevels: any[] | null | undefined = null
) => {
  const divisionToUpdate = await Division.findOne({ where: { id: id } })

  if (divisionToUpdate === null) {
    throw new Error("Division not found");
  }

  divisionToUpdate.division = division;
  divisionToUpdate.points = points;

  if (upperLimit) {
    divisionToUpdate.upperLimit = upperLimit;
  }

  if (lowerLimit) {
    divisionToUpdate.lowerLimit = lowerLimit;
  }

  let levels: ClassLevel[] = []
  if (classLevels) {
    classLevels.forEach(async (classLevel) => {
      const level = await  ClassLevel.findOne({ where: { id: classLevel.id } });
      if (level) {
        levels.push(level);
      }
    });
  }

  divisionToUpdate.classLevels = levels;

  await divisionToUpdate.save();
  return divisionToUpdate;
};

export const deleteDivision = async (id: number) => {
  const division = await Division.delete(id);
  if (division) {
    return "Division Deleted";
  }
};

export const getSingleDivision = async (id: number) => {
  const division = await Division.findOne({ where: { id: id } }) as Division;
  return division;
};

export const getSelectedDivisions = async (ids: any) => {
  const selectedDivisions = await Division.find({ where: { id: In(ids) } });
  return selectedDivisions;
};
