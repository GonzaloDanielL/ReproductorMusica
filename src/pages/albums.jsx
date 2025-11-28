import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';

import datos from '../data/datos.json'

import { FaPlay } from "react-icons/fa";

const Albums = () => {
    const todos = datos.todas
    const { playAudio, setLista, audioRefs } = useContext(AudioContext);

    const formatearTiempo = (segundos) => {
        const min = Math.floor(segundos / 60);
        const seg = Math.floor(segundos % 60);
        return `${min}:${seg < 10 ? '0' + seg : seg}`;
    };

    return (
        <section className='contenido-seccion'>
            <section>
                <h2>No hay xd</h2>
                <div className='contenido-seccion-lista'>
                    {
                        todos.map((item, index) => {
                            return (
                                <div className='lista-item' key={index}>
                                    <div className='lista-img'>
                                        <img src={item.url} alt="" />
                                        <button
                                            onClick={() => {
                                                setLista("todas");
                                                setTimeout(() => {
                                                    playAudio(item.id, {
                                                        nombre: item.nombre,
                                                        artista: item.artista,
                                                        url: item.url
                                                    });
                                                }, 0);
                                            }}>
                                            <FaPlay />
                                        </button>
                                    </div>
                                    <div>
                                        <h3>{item.nombre}</h3>
                                        <span>{item.artista}</span>
                                    </div>
                                    <div>
                                        <span>
                                            {audioRefs.current[item.id]?.duration
                                                ? formatearTiempo(audioRefs.current[item.id].duration)
                                                : '00:00'}
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </section>
    );
};

export default Albums;