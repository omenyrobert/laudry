import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Section extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  section!: string;
}

export const getSections = async () => {
  const sections = await Section.find({
    order: {
      id: "DESC",
    },
  });
  return sections;
};

export const createSections = async (sections: string) => {
  const sectionToInsert = await Section.insert({ section: sections });
  return sectionToInsert;
};

export const deleteSections = async (id: number) => {
  const sectionToDelete = await Section.delete(id);
  if (sectionToDelete) {
    return "Sections Deleted";
  }
};

export const updateSections = async (id: number, sections: string) => {
  const SectionsToUpdate = await Section.update(id, { section: sections });
  return SectionsToUpdate;
};

export const getSingleSections = async (id: number) => {
  const sectionToFind = await Section.findOne({ where: { id: id } });
  return sectionToFind;
};
