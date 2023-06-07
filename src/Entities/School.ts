import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, In } from "typeorm";

@Entity()
export class School extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  motto!: string;

  @Column()
  location!: string;

  @Column()
  phoneNumbers!: string;

  @Column()
  emails!: string;

  @Column()
  description!: string;

  @Column()
  sites!: string;

  @Column({nullable: true,})
  logo!: string;
}

export const getSchools = async () => {
  const schools = await School.find({
    order: {
      id: "DESC",
    },
  });
  return schools;
};

export const createSchool = async (
  name: string,
  motto: string,
  location: string,
  phoneNumbers: string,
  emails: string,
  description: string,
  sites: string,
  logo: string,
) => {
  const school = await School.insert({
    name,
    motto,
    location,
    phoneNumbers,
    emails,
    description,
    sites,
    logo,
  });

  return school;
};

export const updateSchool = async (
  id: number,
  name: string,
  motto: string,
  location: string,
  phoneNumbers: string,
  emails: string,
  description: string,
  sites: string,
  logo: string,
) => {
  const school = await School.update(id, {
    name,
    motto,
    location,
    phoneNumbers,
    emails,
    description,
    sites,
    logo,
  });

  return school;
};

export const deleteSchool = async (id: number) => {
  const school = await School.delete(id);

  if (school) {
    return "School Deleted";
  }

  return school;
};

export const getSingleSchool = async (id: number) => {
  const school = await School.findOne({ where: { id: id } });

  return school;
};

export const getSelectedSchools = async (ids: any) => {
  const selectedSchools = await School.find({ where: { id: In(ids) } });

  return selectedSchools;
};
