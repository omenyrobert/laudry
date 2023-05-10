import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity()
export class House extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  house!: string;
}

export const getHouses = async () => {
  const Houses = await House.find({
    order: {
      id: "DESC",
    },
  });

  return Houses;
};

export const addHouse = async (house: string) => {
  const HouseToAdd = await House.insert({
    house: house,
  });
  return HouseToAdd;
};

export const getHouseById = async (id: number) => {
  const HouseToFindById = await House.findOne({ where: { id: id } });
  return HouseToFindById;
};

export const getHouseByType = async (house: string) => {
  const HouseToFindByType = await House.findOne({
    where: { house: house },
  });
  return HouseToFindByType;
};

export const deleteHouse = async (id: number) => {
  const HouseToDelete = await House.delete(id);
  if (HouseToDelete) {
    return "Staff Type Deleted";
  }
};

export const updateHouse = async (id: number, house: string) => {
  const HouseToUpdate = await House.update(id, { house: house });
  return HouseToUpdate;
};
