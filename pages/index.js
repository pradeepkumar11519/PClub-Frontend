import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import HomePage2 from '@/components/HomePage2'
import { useContext } from 'react'
import Context from '@/context/Context'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {invert} = useContext(Context)
  return (
    <div className={`${invert}`}>
    <HomePage2/>
       
    </div>
  )
}
