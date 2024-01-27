'use client';

import Link from 'next/link'
import React from 'react'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from 'react';
import { Checkbox, Input, Link as CLink } from '@nextui-org/react';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUser } from '@/lib/actions/authActions';
import { toast } from 'react-toastify';
import { useLocale } from '@/LocaleContext';
import { useTranslations } from 'next-intl';

const SignUp = () => {

  const t2 = useTranslations("AuthErrorMessages");

  const FormSchema = z.object({
    username: z
      .string()
      .min(1, `${t2("UsernameMinimum")}`)
      .max(30, `${t2("UsernameMaximum")}`)
      .regex(new RegExp(/^[a-zA-Z0-9]+$/), `${t2("specialCharacters")}`),	
    email: z
      .string()
      .email(`${t2("InvalidEmail")}`),	
    password: z
      .string()
      .min(1, `${t2("PasswordMinimum")}`)
      .max(30, `${t2("PasswordMaximum")}`),
    accepted: z
      .literal(true, { errorMap: () => ({ message: `${t2("AcceptTerms")}` }) }),
  })
  
  type InputType = z.infer<typeof FormSchema>

  const { locale } = useLocale();

  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const togglePass = () => setIsVisiblePass(prev => !prev);
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const saveUser: SubmitHandler<InputType> = async (data) => {
    const { accepted, ...user } = data;
    try {
      const result = await registerUser(user)
      toast.success('User created')
    } catch (error) {
      toast.error('Error creating user')
      console.log(error)
    }

  }

  return (
    <div className=" grid place-items-center mt-[35px]">
      <div className="bg-[#212529] shadow-lg p-5 rounded-lg border-t-4 border-[#3d95ec]">
        <h1 className="text-xl font-bold my-4">
          Register
        </h1>

        <form onSubmit={handleSubmit(saveUser)} className="flex flex-col gap-3 outline-none text-white">
          <Input
            errorMessage={errors.username?.message}
            {...register('username')}
            type="text" placeholder="Username"
            className="w-[400px] rounded-lg text-slate-900"
          />
          <Input
            errorMessage={errors.email?.message}
            {...register('email')}
            type="email" placeholder="Email"
            className="w-[400px] rounded-lg text-slate-900"
          />
          <Input
            errorMessage={errors.password?.message}
            {...register('password')}
            type={isVisiblePass ? "text" : "password"}
            placeholder="Password" className="w-[400px] rounded-lg text-slate-900"
            endContent={isVisiblePass ? <IoEyeOff className="cursor-pointer w-[24px] h-[24px]"
            onClick={togglePass} /> : <IoEye className="cursor-pointer w-[24px] h-[24px]" onClick={togglePass} />}
          />

          <Controller control={control} name="accepted" render={({ field }) =>
            <Checkbox onChange={field.onChange} onBlur={field.onBlur}>
            <p
              className='text-white text-sm'>I accept the <Link className='text-[#3d95ec] underline'
              href={'/'}>Terms</Link>
            </p>
          </Checkbox>
          } />
          {!!errors.accepted && (<p className='text-[#c71111] text-sm'>{errors.accepted.message}</p>)}

          <button
            type="submit"
            className="bg-[#3d95ec] hover:bg-[#51a8ff] transition-all font-bold cursor-pointer px-6 py-2">
            Create
          </button>

          <hr className="mb-4 mt-4 text-CustomBlack" />

        </form>
        <Link href={`/${locale}/sign-in`} className="text-sm mt-3 text-right">
          Already have an account? <span className="underline text-[#3d95ec]">Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
