import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, In } from "typeorm";
import { Account, getSingleAccount } from "./Account";

@Entity()
export class Journal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: string;

  @Column({ nullable: true })
  debit!: number;

  @Column({ nullable: true })
  credit!: number;

  @Column({ nullable: true })
  debitAccountId!: number;

  @Column({ nullable: true })
  creditAccountId!: number;

  @Column()
  transactionType!: string;

  @Column({ nullable: true })
  balance1!: number;

  @Column({ nullable: true })
  balance2!: number;
}

export const getJournals = async () => {
  const journals = await Journal.find({
    order: {
      id: "DESC",
    },
  });
  return journals;
};

export const createJournal = async (
  date: string,
  debit: number,
  credit: number,
  debitAccount: string,
  debitAccountId: number,
  creditAccount: string,
  creditAccountId: number,
  transactionType: string
) => {
  const debitJournal = Journal.insert({
    date,
    debit,
    credit: 0,
    debitAccountId,
    creditAccountId: 0,
    transactionType,
    balance1: 0,
    balance2: 0,
  });

  const creditJournal = Journal.insert({
    date,
    debit: 0,
    credit,
    debitAccountId: 0,
    creditAccountId,
    transactionType,
    balance1: 0,
    balance2: 0,
  });

  if (debitAccount && debitAccountId && debit) {
    //FIXME: const debitAccountEntity = await getSingleAccount(debitAccountId);
    const account = await Account.findOne({ where: { accountName: debitAccount } });
    if (account) {
      account.amount += debit;
      await account.save();
    }
  }

  if (creditAccount && creditAccountId && credit) {
    const creditAccountEntity = await getSingleAccount(creditAccountId);
    if (creditAccountEntity) {
      creditAccountEntity.amount -= credit;
      await creditAccountEntity.save();
    }
  }

  return { debitJournal, creditJournal };
};

export const deleteJournal = async (id: number) => {
  const journal = await Journal.delete(id);
  if (journal) {
    return "Journal Deleted";
  }
};

export const updateJournal = async (id: number, journalData: Partial<Journal>) => {
  const journal = await Journal.findOne({ where: { id: id } }) as Journal;
  if (!journal) {
    throw new Error("Journal not found");
  }
  Object.assign(journal, journalData);
  const updatedJournal = await journal.save();
  return updatedJournal;
};

export const getSingleJournal = async (id: number) => {
  const journal = await Journal.findOne({ where: { id: id } }) as Journal;
  return journal;
};

export const getSelectedJournals = async (ids: any) => {
  const selectedJournals = await Journal.find({ where: { id: In(ids) } });
  return selectedJournals;
};
