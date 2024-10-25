/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useSearchParams } from "next/navigation";
import useFetch from "../hooks/useFetch";
import Card from "./card";
import { useState } from "react";
import Link from "next/link";

export default function PokemonList() {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page'));

    let nextPage = page + 1;
    let previousPage = page !== 1 && page !== 0 ? page - 1 : null;

    const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${page ? (page - 1) * 20 : 0}`);
    const [navigationUrl, setNavigationUrl] = useState('');
    const { data, loading, error } = useFetch(url);
    const results = data as unknown as { results: { name: string, url: string }[] } | null;
    const pokemons = results?.results || [];

    function getNewUrl(newPage: any) {
        const newUrl = new URL(window.location.origin);

        const newParams = new URLSearchParams();
        newParams.set('page', newPage);

        newUrl.search = newParams.toString();

        return newUrl.href;
    }

    function goToNextPage() {
        if (!nextPage) {
            nextPage = 2;
        }
        setUrl(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${nextPage ? (nextPage) * 20 : 0}`);
        setNavigationUrl(getNewUrl(nextPage));
    }

    function goToPreviousPage() {
        if (!previousPage) {
            previousPage = 0;
        }
        setUrl(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${previousPage ? (previousPage) * 20 : 0}`);
        setNavigationUrl(getNewUrl(previousPage));
    }

    if (loading) {
        return <span>Loading...</span>
    }

    if (error) {
        return <span>Error</span>
    }

    return (
        <>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto', margin: 'auto', gap: '16px' }}>
                {pokemons.map((pokemon) => (
                    <Card name={pokemon?.name} url={pokemon?.url} key={pokemon?.name} />
                ))}
            </div>
            <div style={{ display: "flex", gap: "16px", maxWidth: '600px', margin: "24px auto 0" }}>
                <Link href={getNewUrl(previousPage)} onClick={goToPreviousPage} style={{ background: 'blue', padding: '4px 8px' }}>Anterior</Link>
                <Link href={getNewUrl(nextPage)} onClick={goToNextPage} style={{ background: 'blue', padding: '4px 8px' }}>Siguiente</Link>
            </div>
        </>
    )
}