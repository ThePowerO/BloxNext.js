"use server";

import { User } from '@prisma/client';
import prisma from '../prisma';
import * as bcrypt from 'bcrypt';
import { compileResetPasswordTemplate } from '../mail';

export async function registerUser( user: Omit<User, "id" | "image" | "emailVerified"> ) {
  const result = await prisma.user.create({
    data: {
      ...user,
      password: await bcrypt.hash(user.password, 11),
    }
  })
}

/*
export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    },
  });

  if (!user) throw new Error("User Doesn't exists");

  // send email

  const jwtUserId = signJwt({
    id: user.id,
  })
  const resetPassUrl = `${process.env.NEXTAUTH_URL}/reset-password/${jwtUserId}`;
  const body = compileResetPasswordTemplate(user.username, resetPassUrl);
  const sendResult = await sendMail({
    
  })
}
*/