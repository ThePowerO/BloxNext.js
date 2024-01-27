import Link from 'next/link'
import React from 'react'

const Footer = () => {

    return (
        <div className='mt-[50px]'>
            <div className='w-full h-[1px] bg-slate-300'></div>
            <div className='h-[60px] text-center text-sm p-[10px]'>
                <div className='flex items-center justify-center gap-[10px]'>
                    <span className='cursor-pointer hover:text-slate-300'>Privacy</span>
                    <span className='cursor-pointer hover:text-slate-300'>Temrs & Service</span>
                    <span className='cursor-pointer hover:text-slate-300'>Help</span>
                    <span className='cursor-pointer hover:text-slate-300'>Support</span>
                    <span className='cursor-pointer hover:text-slate-300'>Contact</span>
                </div>
                <div>
                    <span>Copyright © 2024 - </span>
                    <Link href={"/"} className='cursor-pointer hover:text-slate-300'>BloxApp.com</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer

