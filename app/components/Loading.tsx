import Image from "next/image"

export default function Loading() { 
    return (
        <div className="flex relative w-full h-screen items-center justify-center bg-teal-500">
            <div className="loader"></div>
            <Image 
                src={"/images/masjid.png"} 
                alt={"masjid"}
                width={200} 
                height={200} 
                className="absolute w-full bottom-0 opacity-10"
            />
        </div>
    )
}