import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';

import datos from '../data/datos.json'

import { FaPlay } from "react-icons/fa";

const Inicio = () => {
    const recientes = datos.recientes
    const todos = datos.todas
    const { playAudio, setLista } = useContext(AudioContext);

    return (
        <section className='contenido-seccion'>
            <section>
                <h2>Escuchados Recientemente</h2>
                <div className='contenido-seccion-lista'>
                    {
                        recientes.map((item, index) => {
                            return (
                                <div className='lista-item' key={index}>
                                    <div className='lista-img'>
                                        <img src={item.url} alt="" />
                                        <button
                                            onClick={() => {
                                                setLista("recientes");
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
            <section>
                <h2>Todas tus canciones</h2>
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

export default Inicio;