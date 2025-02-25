"use client"

import Link from "next/link";
import { useEffect, useState } from "react"
import BackBtn from "../components/BackBtn";
import Loading from "../components/Loading";

interface Surah {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    arti: string;
    deskripsi: string;
    audioFull: {
        [key: string]: string;
    };
}
    
export default function Page() {
    const [ quran, setQuran ] = useState<Surah[]>([]);
    const [ loading, setLoading ] = useState(true);
    const [ search, setSearch ] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://api.i-as.dev/api/quran/surat");
            try {
                if (!response.ok) return null;
                const data = await response.json();
                setQuran(data)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    const searchSurah = quran.filter((surah) => surah.namaLatin.toLocaleLowerCase().includes(search.toLowerCase()) || surah.nomor.toString().includes(search.toString())).map((surah) => ({ nomor: surah.nomor, namaLatin: surah.namaLatin, nama: surah.nama, jumlahAyat: surah.jumlahAyat }))

    if (loading) return <Loading />
    return (
        <div className="">
            <BackBtn path="/" />
            <div className="bg-teal-500 p-4 sticky top-0 flex flex-col items-center">
                <h1 className="font-semibold text-3xl text-white">Quran</h1>
                <input 
                    type="text"
                    placeholder="Search.."
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-2 py-1 rounded-md mt-4" 
                />
            </div>
            <div className="flex flex-col gap-2 p-4">
                {searchSurah && searchSurah.length > 0 ? (
                    searchSurah.map((surah) => (        
                        <Link 
                            href={`/quran/surah/${surah.nomor}`} 
                            key={surah.nomor}
                            className="font-semibold text-lg bg-black/10 p-2 rounded-md flex justify-between items-center hover:bg-teal-500 text-teal-800 hover:text-white"
                        >
                            <div className="flex gap-4 items-center">
                                <h1>{surah.nomor}.</h1>
                                <div>
                                    <h1 className="">{surah.namaLatin}</h1>
                                    <p className="text-sm">{surah.jumlahAyat} Ayat</p>
                                </div>
                            </div>
                            <h1 className="text-2xl">{surah.nama}</h1>
                        </Link>
                    ))): <p>nothing</p>}
            </div>
        </div>
    )
}