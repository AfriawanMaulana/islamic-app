"use client";

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react";


// Components
import Loading from "./components/Loading";
interface Schedule {
  data: {
    id: number;
    lokasi: string;
    daerah: string;
    jadwal: {
      [key: string]: string;
    }
  }
}

interface Calendar {
  data: {
    date: string[]
  }
}

interface Quotes {
  data: [
    {
      text: string;
      reference: string;
    }
  ]
}

export default function Page() {
  const [ schedule, setSchedule ] = useState<Schedule | null>(null);
  const [ calendar, setCalendar ] = useState<Calendar | null>(null);
  const [ quote, setQuote ] = useState<Quotes | null>(null);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    const timeElement = document.querySelector('.time');
    const today = new Date();
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.myquran.com/v2/sholat/jadwal/1638/${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`);
        const calRes = await fetch("https://api.myquran.com/v2/cal/hijr");
        const quoteRes = await fetch("https://apimuslimify.vercel.app/api/v2/quotes");
        if (!response.ok || !calRes.ok || !quoteRes.ok) return null;
        const data = await response.json();
        setSchedule(data);
        setCalendar(await calRes.json());
        setQuote(await quoteRes.json())
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    const clock = () => {
      const today = new Date();
      const hours = today.getHours();
      const minutes = today.getMinutes();
      // const seconds = today.getSeconds()
      
      if (timeElement) {
        timeElement.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
      }
      setTimeout(clock, 1000)
    }
    fetchData();
    clock()
  }, [])
  

  if (loading) return <Loading />
  return (
    <div className="">
      <div className="bg-teal-500 h-80 navTop relative">
        <Image src={"/images/masjid.png"} alt={""} width={300} height={300} className="w-full object-contain h-96 absolute bottom-0 opacity-10"/>
        <div className="p-4 text-white absolute top-0">
          <p className="text-xl font-semibold">{schedule?.data.jadwal.tanggal}</p>
          <p className="opacity-90">Surabaya, Indonesia</p>
        </div>
        <div className="absolute flex flex-col justify-center w-full h-full bottom-4 text-center">
          <h1 className="time font-semibold text-5xl text-white"></h1>
          <p className="text-md text-white font-semibold">{calendar?.data.date[1]}</p>
        </div>   
        {schedule && (
          <ul className="schedule flex flex-row justify-center items-center gap-2 overflow-x-scroll p-4 absolute w-full bottom-0">
            <li className="text-center flex flex-col items-center min-w-24 rounded-xl font-semibold text-white">
              <p>Imsak</p>
              <Image src={"/images/half-moon.png"} alt="imsak" height={50} width={50} />
              <p>{schedule.data.jadwal.imsak}</p>
            </li>
            <li className="text-center flex flex-col items-center min-w-24 rounded-xl font-semibold text-white">
              <p>Subuh</p>
              <Image src={"/images/morning.png"} alt="subuh" height={50} width={50} />
              <p>{schedule.data.jadwal.subuh}</p>
            </li>
            <li className="text-center flex flex-col items-center min-w-24 rounded-xl font-semibold text-white">
              <p>Dzuhur</p>
              <Image src={"/images/sun.png"} alt="dzuhur" height={50} width={50} />
              <p>{schedule.data.jadwal.dzuhur}</p>
            </li>
            <li className="text-center flex flex-col items-center min-w-24 rounded-xl font-semibold text-white">
              <p>Ashar</p>
              <Image src={"/images/afternoon.png"} alt="ashar" height={50} width={50} />
              <p>{schedule.data.jadwal.ashar}</p>
            </li>
            <li className="text-center flex flex-col items-center min-w-24 rounded-xl font-semibold text-white">
              <p>Maghrib</p>
              <Image src={"/images/afternoon.png"} alt="maghrib" height={50} width={50} />
              <p>{schedule.data.jadwal.maghrib}</p>
            </li>
            <li className="text-center flex flex-col items-center min-w-24 rounded-xl font-semibold text-white">
              <p>Isya</p>
              <Image src={"/images/half-moon.png"} alt="isya" height={50} width={50} />
              <p>{schedule.data.jadwal.isya}</p>
            </li>
          </ul>
        )}
      </div>
      <div className="p-4">
        <h1 className="font-semibold text-2xl text-teal-500">All Features</h1>
        <ul className="grid grid-cols-4 gap-3">
          <Link href={'/quran'} className="bg-teal-500 p-2 text-white text-center rounded-xl">
            <Image 
              src={"/icons/quran.png"} 
              alt="" 
              width={30} 
              height={30} 
              className="mx-auto"
            />
            <p>Quran</p>
          </Link>
          <Link href={'/jadwal-sholat'} className="bg-teal-500 p-2 text-white text-center rounded-xl">
            <Image 
              src={"/icons/pray.png"} 
              alt="" 
              width={30} 
              height={30} 
              className="mx-auto"
            />
            <p>Sholat</p>
          </Link>
          <Link href={"/asmaul-husna"} className="bg-teal-500 p-2 text-white text-center rounded-xl">
            <Image 
              src={"/icons/allah.png"} 
              alt="" 
              width={30} 
              height={30} 
              className="mx-auto"
            />
            <p>Asmaul</p>
          </Link>
          <Link href={"/doa"} className="bg-teal-500 p-2 text-white text-center rounded-xl">
            <Image 
              src={"/icons/quran.png"} 
              alt="" 
              width={30} 
              height={30} 
              className="mx-auto"
            />
            <p>Doa</p>
          </Link>
        </ul>
      </div>
      <section className="w-full relative p-4">
        <h1 className="font-semibold text-2xl text-teal-500">Quotes</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {quote?.data.map((data, index) => (
            <blockquote
            key={index}
            className="relative border-2 border-teal-500 w-96 h-56 flex flex-col items-center justify-center text-center space-y-4 p-4 rounded-xl"
            >
            <Image 
              src={"/icons/quote.png"} 
              alt="" 
              width={30}
              height={30}
              className="absolute top-2 left-2" 
            />
            
              <q>{data.text}</q>
              <cite>{data.reference}</cite>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  )
}