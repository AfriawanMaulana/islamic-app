"use client";

import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import BackBtn from "../components/BackBtn";

interface AsmaulHusna {
    data: [
        {   
            id: number;
            arab: string;
            latin: string;
            indo: string;
        }
    ]
}

export default function Page() {
    const [ asmaulHusna, setAsmaulHusna ] = useState<AsmaulHusna | null>(null);
    const [ search, setSearch ] = useState<string>("");
    const [ loading, setLoading ] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.myquran.com/v2/husna/semua");
                if (!response.ok) return null;
                setAsmaulHusna(await response.json());
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    const filtered = asmaulHusna?.data.filter((item) => (item.latin.toLowerCase().includes(search.toLowerCase()) || item.indo.toLowerCase().includes(search.toLowerCase()) || item.id.toString().includes(search.toString()))).map((item) => ({ id: item.id, latin: item.latin, arab: item.arab, indo: item.indo }));

    if (loading) return <Loading />
    return (
        <>
            <BackBtn path="/" />
            <div className="bg-teal-500 p-4 flex flex-col items-center">
                <h1 className="font-semibold text-2xl text-white">Asmaul Husna</h1>
                <input 
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-2 py-1 rounded-lg"
                 />
            </div>
            <div className="flex flex-col gap-2 p-4">
                {filtered && filtered.length > 0 ? (filtered?.map((name) => (
                    <div key={name.id}
                        className="bg-black/10 hover:bg-teal-500 hover:text-white px-2 py-1 rounded-md transition-all duration-300 ease-in-out"
                    >
                        <ul className="flex justify-between items-center">
                            <li className="flex gap-4 items-center">
                                <p className="font-semibold">{name.id}.</p>
                                <div>
                                    <h1 className="font-semibold">{name.latin}</h1>
                                    <p>{name.indo}</p>
                                </div>
                            </li>
                            <h1 className="font-semibold text-2xl text-right">{name.arab}</h1>
                        </ul>
                    </div>
                ))): <p className="text-red-500">*Data tidak ditemukan*</p>}
            </div>
        </>
    )
}