import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Term extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  from!: string;

  @Column()
  to!: string;

  @Column()
  term!: string;

  @Column()
  is_selected!: number;
}

export const getTerms = async () => {
  const terms = await Term.find({
    order: {
      id: "DESC",
    },
  });
  return terms;
};

export const createTerm = async (
  from: string,
  to: string,
  term: string,
  selected: number
) => {
  const termToInsert = await Term.insert({
    from: from,
    to: to,
    term: term,
    is_selected: selected,
  });
  return termToInsert;
};

export const deleteTerm = async (id: number) => {
  const term = await Term.delete(id);
  if (term) {
    return "Term Deleted";
  }
};

export const updateTerm = async (
  id: number,
  from: string,
  to: string,
  term: string,
  selected: number
) => {
  const termToUpdate = await Term.update(id, {
    from: from,
    to: to,
    term: term,
    is_selected: selected,
  });
  return termToUpdate;
};

export const getSingleTerm = async (id: number) => {
  const term = await Term.findOne({ where: { id: id } });
  return term;
};
