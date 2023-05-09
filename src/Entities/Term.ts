import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
} from "typeorm";

@Entity()
export class Term extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  start_date!: string;

  @Column({ nullable: true })
  end_date!: string;

  @Column()
  last_name!: string;

  @Column()
  email!: string;

  @ManyToOne(
    () => Term,
    () => {
      onDelete: "CASCADE";
      onUpdate: "CASCADE";
    }
  )
  @JoinColumn()
  public Term_type!: Term;

  @Column({ select: false })
  password!: string;
}

export const getTermMembers = async () => {
  const TermMembers = await Term.find({
    order: {
      id: "DESC",
    },
    relations: {
      Term_type: true,
    },
  });
  return TermMembers;
};

export const addTermMember = async (
  email: string,
  last_name: string,
  start_date: string,
  end_date: string,
  password: any,
  Term: any
) => {
  const TermToAdd = await Term.insert({
    email: email,
    last_name: last_name,
    start_date: start_date,
    end_date: end_date,
    password: password,
    Term_type: Term,
  });
  return TermToAdd;
};

export const deleteTermMember = async (id: number) => {
  const TermToDelete = await Term.delete(id);
  if (TermToDelete) {
    return "Term Deleted";
  }
};

export const getMemberById = async (id: number) => {
  const TermToFindById = await Term.findOne({ where: { id: id } });
  return TermToFindById;
};

export const getMemberByEmail = async (email: string) => {
  const TermToFindByEmail = await Term.findOne({
    where: { email: email },
    select: [
      "id",
      "email",
      "password",
      "start_date",
      "last_name",
      "end_date",
    ],
  });
  return TermToFindByEmail;
};

export const updateMember = async (
  id: number,
  email: string,
  last_name: string,
  start_date: string,
  end_date: string,
  Term: any
) => {
  const TermToUpdate = await Term.update(id, {
    email: email,
    last_name: last_name,
    start_date: start_date,
    end_date: end_date,
    Term_type: Term,
  });
  return TermToUpdate;
};

export const updatePassword = async (email: string, password: any) => {
  const updatePassword = await Term.update(
    { email: email },
    { password: password }
  );
  return updatePassword;
};
