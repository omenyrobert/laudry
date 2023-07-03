import { hash, compare } from "bcrypt";
import { sign, verify, decode } from "jsonwebtoken";
import { createTransport } from "nodemailer";

export const customPayloadResponse = (
  status: boolean,
  payload: any
): object => {
  return {
    status: status,
    payload: payload,
  };
};

export const randomStringGenerator = (length: number) => {
  let result = "";
  const characters = "A0B1C2D3E4F5G6H7I8J9K0LMNOPQRSTUVWXYZ";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const hashPassword = async (password: string, rounds: number) => {
  try {
    const hashedPassword = await hash(password, rounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export const validatePassword = async (
  password: string,
  hashedPassword: string
) => {
  try {
    const result = await compare(password, hashedPassword);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAuthAccessToken = (user: object, token: any) => {
  const accessToken = sign(JSON.parse(JSON.stringify(user)), token, {
    expiresIn: "1d",
  });
  return accessToken;
};

export const getAuthRefreshToken = (user: object, token: any) => {
  const refreshToken = sign(JSON.parse(JSON.stringify(user)), token, {
    expiresIn: "2d",
  });
  return refreshToken;
};

export const verifyAuthAccessToken = (token: any, secret: any) => {
  const verifiedToken = verify(token, secret);
  return verifiedToken;
};

export const invalidateToken = (modifiedLoad: any, secret: any) => {
  const newToken = sign(modifiedLoad, secret);
  return newToken;
};

export const decodeToken = (token: any) => {
  const decodeToken = decode(token);
  return decodeToken;
};

export const setTokenExpiryToZero = (decodedToken: any) => {
  const modifiedPayload = { ...decodedToken, exp: 0 };
  return modifiedPayload;
};

export const mailTransporter = (email: any, password: any) => {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
  });
  return transporter;
};

export const extraLatestArrayIndex = (array: any) => {
  let lastIndexItem = null;
  for (let i = 0; i < array.length; i++) {
    if (array.length - 1 === i) {
      lastIndexItem = array[i];
    }
  }
  return lastIndexItem;
};
