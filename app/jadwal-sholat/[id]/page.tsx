"use client";

import Image from "next/image";
import BackBtn from "@/app/components/BackBtn";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";

interface Jadwal {
    data: {
        id: number;
        lokasi: string;
        daerah: string;
        jadwal: {
            [key: string]: string;
        };
    }
}
export default function Detail() {
    const  [ jadwal, setJadwal ] = useState<Jadwal | null>(null);
    const [ loading, setLoading ] = useState(true);
    const params = useParams<{ id: string }>();
    useEffect(() => {
        const fetchData = async () => {
            const today = new Date();
            try {
                const response = await fetch(`https://api.myquran.com/v2/sholat/jadwal/${params.id}/${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`);
                if (!response.ok) return null;
                setJadwal(await response.json());
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [params.id])
    
    if (loading) return <Loading />
    return (
        <>  
            <BackBtn path="/jadwal-sholat" />
            <div className="bg-teal-500 p-4 flex flex-col items-center">
                <h1 className="text-2xl font-semibold text-white">Jadwal Sholat</h1>
            </div>
            <div className="my-10">
                <div className="p-4 flex flex-col items-center font-semibold text-2xl">
                    <h1>{jadwal?.data.lokasi}</h1>
                    <h2>{jadwal?.data.jadwal.tanggal}</h2>
                </div>
                <ul className="flex flex-wrap justify-center gap-10">
                    <li className="hover:bg-teal-500 hover:text-white transition-all ease-in-out duration-300 font-semibold border-2 border-teal-500 min-w-44 h-44 rounded-xl flex flex-col items-center justify-center space-y-2">
                        <h1>Imsak</h1>
                        <Image src={"/images/half-moon.png"} alt="imsak" width={100} height={100} />
                        <p>{jadwal?.data.jadwal.imsak}</p>
                    </li>
                    <li className="hover:bg-teal-500 hover:text-white transition-all ease-in-out duration-300 font-semibold border-2 border-teal-500 min-w-44 h-44 rounded-xl flex flex-col items-center justify-center space-y-2">
                        <h1>Subuh</h1>
                        <Image src={"/images/morning.png"} alt="subuh" width={100} height={100} />
                        <p>{jadwal?.data.jadwal.subuh}</p>
                    </li>
                    <li className="hover:bg-teal-500 hover:text-white transition-all ease-in-out duration-300 font-semibold border-2 border-teal-500 min-w-44 h-44 rounded-xl flex flex-col items-center justify-center space-y-2">
                        <h1>Terbit</h1>
                        <Image src={"/images/morning.png"} alt="terbit" width={100} height={100} />
                        <p>{jadwal?.data.jadwal.terbit}</p>
                    </li>
                    <li className="hover:bg-teal-500 hover:text-white transition-all ease-in-out duration-300 font-semibold border-2 border-teal-500 min-w-44 h-44 rounded-xl flex flex-col items-center justify-center space-y-2">
                        <h1>Dhuha</h1>
                        <Image src={"/images/sun.png"} alt="imsak" width={100} height={100} />
                        <p>{jadwal?.data.jadwal.dhuha}</p>
                    </li>
                    <li className="hover:bg-teal-500 hover:text-white transition-all ease-in-out duration-300 font-semibold border-2 border-teal-500 min-w-44 h-44 rounded-xl flex flex-col items-center justify-center space-y-2">
                        <h1>Dzuhur</h1>
                        <Image src={"/images/sun.png"} alt="dzuhur" width={100} height={100} />
                        <p>{jadwal?.data.jadwal.dzuhur}</p>
                    </li>
                    <li className="hover:bg-teal-500 hover:text-white transition-all ease-in-out duration-300 font-semibold border-2 border-teal-500 min-w-44 h-44 rounded-xl flex flex-col items-center justify-center space-y-2">
                        <h1>Ashar</h1>
                        <Image src={"/images/afternoon.png"} alt="ashar" width={100} height={100} />
                        <p>{jadwal?.data.jadwal.ashar}</p>
                    </li>
                    <li className="hover:bg-teal-500 hover:text-white transition-all ease-in-out duration-300 font-semibold border-2 border-teal-500 min-w-44 h-44 rounded-xl flex flex-col items-center justify-center space-y-2">
                        <h1>Maghrib</h1>
                        <Image src={"/images/afternoon.png"} alt="maghrib" width={100} height={100} />
                        <p>{jadwal?.data.jadwal.maghrib}</p>
                    </li>
                    <li className="hover:bg-teal-500 hover:text-white transition-all ease-in-out duration-300 font-semibold border-2 border-teal-500 min-w-44 h-44 rounded-xl flex flex-col items-center justify-center space-y-2">
                        <h1>Isya</h1>
                        <Image src={"/images/half-moon.png"} alt="isya" width={100} height={100} />
                        <p>{jadwal?.data.jadwal.isya}</p>
                    </li>
                </ul>
            </div>
        </>
    )
}