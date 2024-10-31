'use client';

import useFetch from "@/app/hooks/useFetch";
import { capitalize } from "@/app/utils/capitalization.util";
import { usePathname, useRouter } from "next/navigation";

export default function Pokemon() {
    const pathName = usePathname();
    const router = useRouter();
    const id = pathName.split('/').at(-1);
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const { data, loading, error } = useFetch(url);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pokemonData = data as unknown as any;
    const imageUrl = pokemonData?.sprites?.other['official-artwork']?.front_default;
    const cry = pokemonData?.cries?.latest;
    const name = pokemonData?.name;

    if (loading) {
        return (
            <>
                <button onClick={router.back}>Atrás</button>
                <div>
                    <div style={{ height: '475px', width: '475px', background: 'grey' }}></div>
                </div>
                <span>Cargando...</span>
            </>
        )
    }

    if (error) {
        <button onClick={router.back}>Atrás</button>
        return (
            <span>Ha ocurrido un error</span>
        )
    }

    return (
        <>
            <button onClick={router.back}>Atrás</button>
            <div>
                <img src={imageUrl} alt="" />
            </div>
            <span>{capitalize(name)}</span>
            <audio src={cry} controls></audio>
        </>
    )
}