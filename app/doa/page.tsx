"use client";

import { useState, useEffect } from "react";
import BackBtn from "../components/BackBtn";
import Loading from "../components/Loading";

interface Doa {
    data: [{
        arab: string;
        indo: string;
        judul: string;
        source: string;
    }]
}
export default function Page() {
    const [ doa, setDoa] = useState<Doa | null>(null);
    const [ loading, setLoading ] = useState(true); 
    const [ sumber, setSumber ] = useState("quran")
    const [ search, setSearch ] = useState<string>('')


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.myquran.com/v2/doa/sumber/${sumber}`);
                if (!response.ok) return null;
                setDoa(await response.json());
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [sumber])

    const searchDoa = doa?.data.filter((data) => data.judul.toLocaleLowerCase().includes(search.toLowerCase())).map((data) => ({ judul: data.judul, arab: data.arab, indo: data.indo}))

    if (loading) return <Loading />
    return (
        <>  
            <BackBtn path={"/"} />
            <div className="bg-teal-500 p-4 flex flex-col justify-center items-center space-y-2 sticky top-0">
                <h1 className="font-semibold text-2xl text-white">Doa - Doa</h1>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-2 py-1 rounded-lg" 
                />
            </div>
            <div className="flex flex-col gap-2 p-4">
                <div className="flex gap-2 font-semibold">
                    <h1>Sumber: </h1>
                    <select onChange={(e) => setSumber(e.target.value)}>
                        <option value="quran">Quran</option>
                        <option value="hadits">Hadits</option>
                        <option value="pilihan">Pilihan</option>
                        <option value="harian">Harian</option>
                        <option value="ibadah">Ibadah</option>
                        <option value="haji">Haji</option>
                        <option value="lainnya">Lainnya</option>
                    </select>
                </div>
                {searchDoa && searchDoa.length > 0 ? 
                (
                    searchDoa?.map((data, index) => (
                         <div 
                            key={data.judul}
                            className="bg-slate-100 px-2 py-4 rounded-xl space-y-4"
                        >   
                            <h1 className="font-semibold text-4xl text-right">{data.arab}</h1>
                            <div className="flex gap-4">
                                <p className="font-semibold text-xl">{index + 1}.</p>
                                <ul>
                                    <p className="text-lg font-semibold text-black/80">{data.judul}</p>
                                    <p className="text-sm text-black/80">{data.indo}</p>
                                </ul>
                            </div>
                        </div>
                    ))
                ): null}
            </div>
        </>
    )
}