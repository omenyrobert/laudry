import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Stream extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	stream!: string;
}

export const getStreams = async () => {
	const streams = await Stream.find({
		order: {
			id: "DESC",
		},
	});
	return streams;
};

export const createStream = async (stream: string) => {
	const streamToInsert = await Stream.insert({ stream: stream });
	return streamToInsert;
};

export const deleteStream = async (id: number) => {
	const stream = await Stream.delete(id);
	if (stream) {
		return "Stream Deleted";
	}
};

export const updateStream = async (id: number, stream: string) => {
	const streamToUpdate = await Stream.update(id, { stream: stream });
	return streamToUpdate;
};

export const getSingleStream = async (id: number) => {
	const stream = await Stream.findOne({ where: { id: id } });
	return stream;
};
