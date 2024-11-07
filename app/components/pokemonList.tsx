/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import useFetch from "../hooks/useFetch";
import Card from "./card";
import { Suspense, useState } from "react";
import Link from "next/link";
import useSearchParamsList from "../hooks/useSearchParamsList";

export default function PokemonList() {
    // eslint-disable-next-line prefer-const
    let { page, nextPage, previousPage } = useSearchParamsList();

    const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${page ? (page - 1) * 20 : 0}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <span>Loading...</span>
            </Suspense>)
    }

    if (error) {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <span>Error</span>
            </Suspense>)
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto', margin: 'auto', gap: '16px' }}>
                {pokemons.map((pokemon) => (
                    <Card name={pokemon?.name} url={pokemon?.url} key={pokemon?.name} />
                ))}
            </div>
            <div style={{ display: "flex", gap: "16px", maxWidth: '600px', margin: "24px auto 0" }}>
                <Link href={getNewUrl(previousPage)} onClick={goToPreviousPage} style={{ background: 'blue', padding: '4px 8px' }}>Anterior</Link>
                <Link href={getNewUrl(nextPage)} onClick={goToNextPage} style={{ background: 'blue', padding: '4px 8px' }}>Siguiente</Link>
            </div>
        </Suspense>
    )
}