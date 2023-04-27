import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Sections extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	section!: string;
}

export const getSections = async () => {
	const sections = await Sections.find({
		order: {
			id: "DESC",
		},
	});
	return sections;
};

export const createSections = async (sections: string) => {
	const sectionsToInsert = await Sections.insert({ section: sections });
	return sectionsToInsert;
};

export const deleteSections = async (id: number) => {
	const sections = await Sections.delete(id);
	if (Sections) {
		return "Sections Deleted";
	}
};

export const updateSections = async (id: number, sections: string) => {
	const SectionsToUpdate = await Sections.update(id, { section: sections });
	return SectionsToUpdate;
};

export const getSingleSections = async (id: number) => {
	const sections = await Sections.findOne({ where: { id: id } });
	return sections;
};
