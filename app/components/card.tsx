/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import useFetch from "../hooks/useFetch";
import { capitalize } from "../utils/capitalization.util";

interface CardProps {
    name: string;
    url: string;
}

export default function Card({ name, url }: CardProps) {
    const { data, loading, error } = useFetch(url);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pokemonData = data as unknown as any;
    const imageUrl = pokemonData?.sprites?.front_default;
    const id = pokemonData?.id;

    if (loading) {
        return (
            <Link href={'/pokemon/' + id}>
                <div style={{ width: '96px', height: '96px', background: 'grey' }}></div>
                <span>{capitalize(name)}</span>
            </Link>)
    }

    if (error) {
        return (
            <Link href={'/pokemon/' + id}>
                <span>{capitalize(name)}</span>
            </Link>)
    }

    return (
        <Link style={{ width: 'fit-content', display: "flex", flexDirection: "column", gap: '8px', justifyContent: "center", alignItems: "center" }} href={'/pokemon/' + id}>
            <img src={imageUrl} alt={name} loading="lazy" />
            <span>{capitalize(name)}</span>
        </Link>
    )
}