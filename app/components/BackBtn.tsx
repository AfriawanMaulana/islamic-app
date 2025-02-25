import Link from "next/link";


export default function BackBtn({ path }: {path: string}) {
    return (
        <Link href={path} className="fixed top-4 left-4 z-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>

        </Link>
    )
}