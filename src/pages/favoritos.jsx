import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';

import datos from '../data/datos.json'

import { FaPlay } from "react-icons/fa";

const Favoritos = () => {
    const todos = datos.favoritos
    const { playAudio, setLista } = useContext(AudioContext);

    return (
        <section className='contenido-seccion'>
            <section>
                <h2>Lista de favoritos</h2>
                <div className='contenido-seccion-lista'>
                    {
                        todos.map((item, index) => {
                            return (
                                <div className='lista-item' key={index}>
                                    <div className='lista-img'>
                                        <img src={item.url} alt="" />
                                        <button
                                            onClick={() => {
                                                setLista("favoritos");
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
                                    <h3>{item.nombre}</h3>
                                    <span>{item.artista}</span>
                                </div>
                            )

                        })
                    }
                </div>
            </section>
        </section>
    );
};

export default Favoritos;