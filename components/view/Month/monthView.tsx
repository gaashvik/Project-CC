'use client'


import React, { Fragment } from 'react'
import MonthViewBox from './box'
// import { useDateStore } from '@/lib/store';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
export default function MonthView() {

  const { twoDMonthArray } = useAppSelector((state:RootState)=>state.date);
  return (
    <section className='grid grid-cols-7 grid-rows-5 lg:h-[100vh]'>
     {twoDMonthArray.map((row, i) => (
        <Fragment key={i}>
          {row.map((day, index) => (
            <MonthViewBox key={index} day={day} rowIndex={i} />
          ))}
        </Fragment>
      ))}
    </section>
  )
}
