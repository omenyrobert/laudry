import { Request, Response } from "express";
import {
  addFeePayment,
  getStudentPayments,
} from "../Entities/StudentFeePayment";
import {
  customPayloadResponse,
  extraLatestArrayIndex,
} from "../Helpers/Helpers";
import { getTermBySelect } from "../Entities/Term";
import { getSingleStudent } from "../Entities/Student";
import {
  addRow,
  getStudentTermPayments,
  updateRow,
} from "../Entities/StudentPaidBalance";

export const createPayment = async (req: Request, res: Response) => {
  try {
    const activeTerm = await getTermBySelect();
    const {
      date,
      amount,
      studentId,
      method,
      paidBy,
      bank,
      branch,
      bankSlipNo,
      mobileName,
      mobileNo,
      accountName,
      accountNo,
      contact,
      fromAccountNo,
    } = req.body;
    if (!amount) {
      return res.json(customPayloadResponse(false, "Amount Required")).end();
    }
    const student = await getSingleStudent(studentId);

    const termId = activeTerm !== null ? activeTerm.id : null;

    const amount_to_be_paid = extraLatestArrayIndex(student?.fees);

    const amount_basing_on_balance = await getStudentTermPayments(
      studentId,
      termId
    );

    const balance = await balanceCalculator(
      studentId,
      amount,
      amount_to_be_paid,
      termId,
      amount_basing_on_balance
    );
    if (typeof balance === "string") {
      return res.json(customPayloadResponse(false, balance)).end();
    }
    await addFeePayment(
      studentId,
      method,
      amount,
      date,
      paidBy,
      contact,
      bank,
      branch,
      accountNo,
      accountName,
      mobileNo,
      bankSlipNo,
      mobileName,
      termId,
      fromAccountNo
    );
    const currentBalance = balance.balance;
    const currentAmount = balance.amount_paid;
    if (amount_basing_on_balance === null) {
      await addRow(studentId, termId, currentBalance, currentAmount);
    } else {
      await updateRow(
        studentId,
        termId,
        currentBalance,
        currentAmount,
        amount_basing_on_balance.id
      );
    }
    return res
      .json(customPayloadResponse(true, "Payment Made"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

const balanceCalculator = async (
  studentId: any,
  amount: any,
  amount_to_be_paid: any,
  termId: any,
  amount_basing_on_balance: any
): Promise<any> => {
  let amount_payable =
    amount_basing_on_balance === null
      ? parseFloat(amount_to_be_paid.amount)
      : parseFloat(amount_basing_on_balance.balance);
  if (parseFloat(amount) <= amount_payable) {
    let balance = 0;
    let total_installments = 0;
    const studentPayments = await getStudentPayments(studentId, termId);
    if (studentPayments.length > 0) {
      studentPayments.forEach((payment) => {
        total_installments += parseFloat(payment.amount_paid);
      });
      let new_installments = total_installments + parseFloat(amount);
      balance = amount_payable - parseFloat(amount);
      return {
        balance: balance.toString(),
        amount_paid: new_installments.toString(),
      };
    } else if (studentPayments.length == 0) {
      balance = amount_payable - parseFloat(amount);
      total_installments = parseFloat(amount);
      return {
        balance: balance.toString(),
        amount_paid: total_installments.toString(),
      };
    }
  }
  return "Amount exceeds the total to be paid";
};

export const studentInstallments = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.body;
    if (!studentId) {
      return res
        .json(customPayloadResponse(false, "Student Required"))
        .status(404)
        .end();
    }
    const activeTerm = await getTermBySelect();
    const termId = activeTerm !== null ? activeTerm.id : null;
    const studentPayments = await getStudentPayments(studentId, termId);
    return res
      .json(customPayloadResponse(true, studentPayments))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};
