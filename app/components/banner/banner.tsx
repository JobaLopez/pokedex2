// 'use client'

// import { useState } from 'react';
import styles from './banner.module.css';

export default function Banner() {
    // const [position, setPosition] = useState(0);

    // function animate() {
    //     setPosition(position => position + 2);

    //     if (position > window.innerWidth || position === 200) {
    //         setPosition(200);
    //         return;
    //     } else {
    //         window.requestAnimationFrame(animate);
    //     }

    // }

    // window.requestAnimationFrame(animate);
    //Esto iría en la etiqueta div
    //style={{right: position+'px'}}
    return (
        <div className={styles.banner} > 
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente iure fugit, possimus tempora cupiditate consequatur doloremque voluptatibus fugiat aliquid culpa porro. Doloribus, earum minima. Sint adipisci iure nam magnam eius.</p>
        </div>
    )
}