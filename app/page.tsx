import { Suspense } from "react";
import styles from './styles/main.module.css'
import PokemonList from "./components/pokemonList";
export default function Home() {
    return (
        <header>
            <main className={styles.main}>
                <Suspense>
                    <PokemonList />
                </Suspense>
            </main>
        </header>
    )
}