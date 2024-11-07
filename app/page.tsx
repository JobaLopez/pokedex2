import { Suspense } from "react";
import PokemonList from "./components/pokemonList";
export default function Home() {
    return (
        <header>
            <Suspense>
                <PokemonList />
            </Suspense>
        </header>
    )
}