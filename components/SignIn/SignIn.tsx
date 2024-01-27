'use client';

import Link from 'next/link'
import React from 'react'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from 'react';
import { Checkbox, Input, Link as CLink } from '@nextui-org/react';
import { useLocale } from '@/LocaleContext';
import { FcGoogle } from "react-icons/fc";
import RobloxImg from "@/public/Roblox.png";
import DiscordImg from "@/public/Discord.png";
import { signIn, useSession, signOut } from 'next-auth/react';
import { z } from 'zod';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const SignIn = () => {
  
  const t2 = useTranslations("AuthErrorMessages");
  
  const FormSchema = z.object({
    emailusername: z
      .string()
      .min(1, `${t2("EmailMinimum")}`)
      .email(`${t2("InvalidEmail")}`),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(1, `${t2("PasswordMinimum")}`)	,
  })
  
  type InputType = z.infer<typeof FormSchema>

  const t = useTranslations("SignInPage");
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  })

  const { locale } = useLocale();

  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const togglePass = () => setIsVisiblePass(prev => !prev);

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.emailusername,
      password: data.password,
    });
    if (!result?.ok) {
      toast.error(result?.error)
      return;
    }
    router.push("/");
  }

  return (
    <div className=" grid place-items-center">
      <div className="bg-[#212529] shadow-lg p-5 rounded-lg border-t-4 border-[#3d95ec]">
        <h1 className="text-xl font-bold my-4">
          {t("h1")}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 outline-none text-white">
          <Input
            {...register('emailusername')}
            errorMessage={errors.emailusername?.message}
            type="email" placeholder="Email or Username"
            className="w-[400px] rounded-lg text-slate-900"
          />
          <Input
            {...register('password')}
            errorMessage={errors.password?.message}
            type={isVisiblePass ? "text" : "password"}
            placeholder="Password" className="w-[400px] rounded-lg text-slate-900"
            endContent={isVisiblePass ? <IoEyeOff className="cursor-pointer w-[24px] h-[24px]"
            onClick={togglePass} /> : <IoEye className="cursor-pointer w-[24px] h-[24px]" onClick={togglePass} />}
          />

          <div>
            <Link className="text-sm mt-3 text-left" href={`/${locale}/forgot-password`}>
              <span className="underline text-[#3d95ec]">Forgot Password</span>
            </Link>
          </div>

          <button
            type="submit"
            className="bg-[#3d95ec] hover:bg-[#51a8ff] transition-all font-bold cursor-pointer px-6 py-2">
            {t("button")}
          </button>

          <div className="flex justify-center text-sm mt-[10px]">
            <span className="text-gray-300">
              {t("signinwith")}
            </span>
          </div>

          <div className='w-full'>
            <button
              className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-all
              text-black rounded-lg mt-[7px] w-full p-1"
              >
                {t("withgoogle")}<FcGoogle className="w-[20px] h-[20px] cursor-pointer ml-[5px]"
              />
            </button>
            <button
              className="flex items-center justify-center border-[2px] border-slate-900 bg-slate-900
              hover:bg-slate-800 transition-all text-white rounded-lg mt-[7px] w-full p-1"
              >
                {t("withroblox")}<Image width={25} height={25} src={RobloxImg} alt="" className="cursor-pointer ml-[5px]"
              />
            </button>
            <button
              className="flex items-center justify-center border border-[#42599f] bg-[#42599f]
              hover:bg-[#2c396e] transition-all text-white rounded-lg mt-[7px] w-full p-1"
              >
                {t("withdiscord")}<Image width={25} height={25} src={DiscordImg} alt="" className="invert cursor-pointer ml-[5px]"
              />
            </button>
          </div>

          <hr className="mb-4 mt-4 text-CustomBlack" />

        </form>
        <Link className="text-sm mt-3 text-right" href={`/${locale}/sign-up`}>
          {t("text")} <span className="underline text-[#3d95ec]">Sign Up</span>
        </Link>
      </div>
    </div>
  )
}

export default SignIn;
