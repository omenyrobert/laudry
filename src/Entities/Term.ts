import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Term extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  from!: Number;

  @Column()
  to!: Number;

  @Column()
  term!: string;
}

export const getTerms = async () => {
  const terms = await Term.find({
    order: {
      id: "DESC",
    },
  });
  return terms;
};

export const createTerm = async (from: number, to: number, term: string) => {
  const TermToInsert = await Term.insert({ from: from, to: to, term: term });
  return TermToInsert;
};

export const deleteTerm = async (id: number) => {
  const term = await Term.delete(id);
  if (term) {
    return "Term Deleted";
  }
};

export const updateTerm = async (id: number, from: number, to: number, term: string) => {
  const TermToUpdate = await Term.update(id, { from: from, to: to, term: term });
  return TermToUpdate;
};

export const getSingleTerm = async (id: number) => {
  const term = await Term.findOne({ where: { id: id } });
  return term;
};
