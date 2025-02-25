"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import BackBtn from "../components/BackBtn";
import Loading from "../components/Loading";

interface Jadwal {
    data: [
        {
            id: string;
            lokasi: string;
        }
    ]
}

export default function Page() {
    const [ schedule, setSchedule ] = useState<Jadwal | null>(null);
    const [ search, setSearch ] = useState<string>("");
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.myquran.com/v2/sholat/kota/semua");
                if (!response.ok) return null;
                setSchedule(await response.json());
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, []);

    const filteredCities = schedule?.data.filter((item) => item.lokasi.toLowerCase().includes(search.toLowerCase())).map((item) => ({ id: item.id, lokasi: item.lokasi }));

    if (loading) return <Loading />
    return (
        <>
            <BackBtn path="/" />
            <div className="bg-teal-500 flex flex-col items-center p-4 sticky top-0">
                <h1 className="font-bold text-2xl text-white">Jadwal Sholat Indonesia</h1>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-2 py-1 rounded-lg w-full"
                />

            </div>
            <div className="p-4 flex flex-col gap-2">
                {filteredCities && filteredCities?.length > 0 ? (
                    filteredCities?.map((item, index) => (
                        <Link 
                            key={index}
                            href={`/jadwal-sholat/${item.id}`}
                            className="bg-black/10 hover:bg-teal-500 p-2 rounded-lg text-black/70 hover:text-white font-semibold"
                        >
                            {item.lokasi}
                        </Link>
                    ))
                ): <p className="text-red-500">*Data tidak ditemukan*</p>}
                {/* {schedule?.data.map((item) => (
                    <Link 
                        key={item.id}
                        href={`/jadwal-sholat/${item.lokasi.split("KAB.")}`}
                        className="bg-black/10 hover:bg-teal-500 p-2 rounded-lg text-black/70 hover:text-white font-semibold"
                    >
                        {item.lokasi}
                    </Link>
                ))} */}
            </div>
        </>
    )
}