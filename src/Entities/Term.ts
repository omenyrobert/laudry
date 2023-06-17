
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  In,
} from "typeorm";
import { Student } from "./Student";

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

  @ManyToMany(() => Student, (student) => student.terms)
  students: [];
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

export const getTermBySelect = async () => {
  const term = await Term.findOne({ where: { is_selected: 1 } });
  return term;
};

export const selectedTermIds = async (ids:any) => {
  const selectedTerms = await Term.find({
    where: { id: In(ids) },
  });
  return selectedTerms;
};
