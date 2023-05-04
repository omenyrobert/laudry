require("dotenv").config();
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import { mailTransporter } from "../Helpers/Helpers";

@Entity()
export class PasswordReset extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  code!: string;

  @Column()
  token!: string;
}

export const createNewToken = async (
  email: string,
  token: string,
  code: string
) => {
  const createToken = await PasswordReset.insert({
    email: email,
    token: token,
    code: code,
  });
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Password Reset Code",
    html: `Hello  your  password reset code is <p><b>${code}</b></p>`,
  };
  const mailTransport = mailTransporter(
    process.env.MAIL_USER,
    process.env.MAIL_PASSWORD
  );
  mailTransport
    .sendMail(mailOptions)
    .then(() => {})
    .catch((error) => console.log(error));
  return createToken;
};

export const findByEmail = async (email: string) => {
  const tokenToFind = await PasswordReset.findOne({ where: { email: email } });
  return tokenToFind;
};

export const deleteToken = async (id: number) => {
  const tokenToDelete = await PasswordReset.delete(id);
  if (tokenToDelete) {
    return "Delete token";
  }
};

export const findByCode = async (code: string) => {
  const tokenToFind = await PasswordReset.findOne({ where: { code: code } });
  return tokenToFind;
};
