"use client"

import BackBtn from "@/app/components/BackBtn";
import Loading from "@/app/components/Loading";

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


interface Surah {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    arti: string;
    deskripsi: string;
    audioFull: {
        "04": string;
    }
    ayat: [{
        nomorAyat: number;
        teksArab: string;
        teksLatin: string;
        teksIndonesia: string;
        audio: {
            "04": string
        }
    }]
}

export default function SurahDetail() {
    const params = useParams<{ id: string }>()
    const [ surah, setSurah ] = useState<Surah | null>(null);
    const [ loading, setLoading ] = useState(true);
    // const [ isPlaying, setIsPlaying ] = useState(false);
    
    // const handlePlayer = (e: { preventDefault: () => void; }) => {
    //     e.preventDefault();
    //     if (isPlaying == false) {
    //         setIsPlaying(true);
    //         (document.getElementById('audio') as HTMLMediaElement)?.play();
    //     } else {
    //         setIsPlaying(false);
    //         (document.getElementById('audio') as HTMLMediaElement)?.pause();
    //     }
    // } 
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.i-as.dev/api/quran/surat/${params.id}`);
                if (!response.ok) return null;
                const data = await response.json();
                setSurah(data);
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [params.id])
    
    if (loading) return <Loading />
    return (
        <div className="">
            <BackBtn path="/quran" />
            <div className="bg-teal-500 p-4 text-white flex flex-col items-center sticky top-0">
                <h1 className="font-semibold text-xl">{surah?.namaLatin} ({surah?.jumlahAyat} Ayat | {surah?.tempatTurun})</h1>
                <p>{surah?.arti}</p>
            </div>
            <div className="flex flex-col gap-2 p-4">
                {surah?.ayat.map((ayat) => {
                    return (
                        <div 
                            key={ayat.nomorAyat}
                            className="bg-slate-100 px-2 py-4 rounded-xl space-y-4"
                        >   
                            <h1 className="font-semibold text-4xl text-right">{ayat.teksArab}</h1>
                            <div className="flex gap-4">
                                <p className="font-semibold text-xl">{ayat.nomorAyat}.</p>
                                <ul>
                                    <p className="text-lg font-semibold text-black/80">{ayat.teksLatin}</p>
                                    <p className="text-sm text-black/80">{ayat.teksIndonesia}</p>
                                </ul>
                            </div>
                        </div>
                    )
                })}
                {/* <button onClick={handlePlayer} id="button">{!isPlaying ? 'play' : 'pause'}</button> */}
            </div>
            <div className="bg-teal-500 w-full sticky bottom-0 px-2 h-14 rounded-t-xl">
                <audio controls className="w-full">
                    <source src={surah?.audioFull["04"]} type="audio/mpeg"/>
                </audio>
            </div>
        </div>
    )
}