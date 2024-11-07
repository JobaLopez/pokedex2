import { Suspense } from "react";
import styles from './styles/main.module.css'
import PokemonList from "./components/pokemonList";
import Banner from "./components/banner/banner";
export default function Home() {
    return (
        <>
            <header>
            </header>
            <main className={styles.main}>
                <Suspense>
                    <PokemonList />
                </Suspense>
            </main>
            <Banner />
        </>
    )
}