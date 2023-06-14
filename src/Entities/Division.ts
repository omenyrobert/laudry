import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, In } from "typeorm";

@Entity()
export class Division extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  division!: string;

  @Column()
  points!: number;
}

export const getDivisions = async () => {
  const divisions = await Division.find({
    order: {
      id: "DESC",
    },
  });
  return divisions;
};

export const createDivision = async (division: string, points: number) => {
  const divisionToInsert = await Division.insert({ division, points });
  return divisionToInsert;
};

export const updateDivision = async (id: number, division: string, points: number) => {
  const divisionToUpdate = await Division.update(id, { division, points });
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
