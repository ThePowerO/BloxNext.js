'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const ActiveLink = ({ item, locale }: { item: { title: string; path: string }; locale: string }) => {
  const pathname = usePathname();

  return (
    <div className=''>
      <Link href={`/${locale}${item.path}`} className={`${pathname === `/${locale}${item.path}` ? 'text-slate-300' : ''}`}>{item.title}</Link>
      <div className={`${pathname === `/${locale}${item.path}` ? 'bg-cyan-300 h-[2px] rounded-full' : ''}`}></div>
    </div>
  );
};

export default ActiveLink;