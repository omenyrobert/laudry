import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class SchoolClass extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	class!: string;
}
