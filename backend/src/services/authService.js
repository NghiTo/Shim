import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import pkg from 'lodash';

const { omit } = pkg;
const prisma = new PrismaClient();

const register = async (data) => {
  const SALT_ROUNDS = 10;
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
  const newData = { ...data, password: hashedPassword };
  const user = await prisma.user.create({ data: newData });
  return omit(user, ["password"]);
};

export default { register };
