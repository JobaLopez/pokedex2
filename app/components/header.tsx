import Link from "next/link";

export default function Header() {
    return (
        <header className="p-8 bg-slate-500">
            <Link href="/">
                <h1 className="text-white">Pokédex</h1>
            </Link>
        </header>
    )
}