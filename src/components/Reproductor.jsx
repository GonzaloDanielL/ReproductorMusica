import { useContext, useState, useEffect, use } from 'react';
import { AudioContext } from '../context/AudioContext';

import { IoCaretBack } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";

import disco from '/imgs/disco.webp'

import datos from '../data/datos.json'

const Reproductor = () => {
    const [todos, setTodos] = useState([]);

    const {
        audioActual,
        reproduciendo,
        setReproduciendo,
        volumen,
        setVolumen,
        infoActual,
        duracion,
        tiempoActual,
        setTiempoActual,
        playAudio,
        audioRefs,
        lista,
        posicion,
        repetir,
        setRepetir,
        aleatorio,
        setAleatorio,
        generarListaAleatoria,
        cola,
        reproducirSiguiente,
        aleatorioRef,
        colaRef

    } = useContext(AudioContext);

    const [muteado, setMuteado] = useState(false);

    const manejarVolumen = (e) => {
        const nuevoVolumen = parseFloat(e.target.value);
        setVolumen(nuevoVolumen);

        // Actualizar volumen en el audio actual (si está reproduciéndose)
        if (audioActual) {
            audioActual.volume = nuevoVolumen;
        }
    };


    const toggleMute = () => {
        if (audioActual) {
            audioActual.muted = !muteado;
            setMuteado(!muteado);
        }
    };

    const togglePlayPause = () => {
        if (!audioActual) {
            reproducirAudio("predeterminado")
            return;
        };

        if (reproduciendo) {
            audioActual.pause();
            setReproduciendo(false);
            document.getElementById('disco-musical').style.animationPlayState = "paused";
            document.getElementById('img-reproduccion').style.animationPlayState = "paused";

        } else {
            audioActual.play();
            setReproduciendo(true);
            document.getElementById('disco-musical').style.animationPlayState = "running";
            document.getElementById('img-reproduccion').style.animationPlayState = "running";
        }
    };

    const desplegarReproductor = () => {
        const elemento = document.getElementById('reprodutor');
        elemento.classList.toggle('expandido');
    };

    const formatearTiempo = (segundos) => {
        const min = Math.floor(segundos / 60);
        const seg = Math.floor(segundos % 60);
        return `${min}:${seg < 10 ? '0' + seg : seg}`;
    };

    const aplicarLista = () => {
        setTimeout(() => {
            if (aleatorioRef.current === false) {
                const listaOriginal = lista === "recientes" ? datos.recientes : lista === "favoritos" ? datos.favoritos : datos.todas;
                setTodos(listaOriginal);
            } else {
                setTodos(colaRef.current);
            }
        }, 300);
    }

    const repetirAudio = () => {
        if (repetir == "no") {
            setRepetir("una");
            document.querySelectorAll('.boton-repetir').forEach(item => item.style.color = "#EEEEEE");
            document.querySelectorAll('.boton-repetir-span').forEach(item => item.style.opacity = "1");

        } else if (repetir == "una") {
            setRepetir("todo");
            document.querySelectorAll('.boton-repetir').forEach(item => item.style.color = "#EEEEEE");

            document.querySelectorAll('.boton-repetir-span').forEach(item => item.style.opacity = "0");

        } else if (repetir == "todo") {
            setRepetir("no");
            document.querySelectorAll('.boton-repetir').forEach(item => item.style.color = "#868686");
        }
    }

    const aleatorioPlay = () => {
        if (aleatorio == true) {
            setAleatorio(false);
            document.querySelectorAll('.boton-aleatorio').forEach(item => item.style.color = "#868686");

        } else {
            setAleatorio(true);
            document.querySelectorAll('.boton-aleatorio').forEach(item => item.style.color = "#EEEEEE");
            const listaOriginal = lista === "recientes" ? datos.recientes : lista === "favoritos" ?
                datos.favoritos : datos.todas;
            const idActual = posicion; // ✅ Más confiable que usar dataset
            generarListaAleatoria(listaOriginal, idActual);
        }
    }

    return (
        <footer id='reprodutor' className='reprodutor'>

            <div className='reprodutor-contenido'>

                <div className='fondo-reproduccion'>
                    <div></div>
                    <img src={infoActual.url} alt="Imagen de la canción" />
                </div>

                <input
                    type="range"
                    min="0"
                    max={duracion}
                    value={tiempoActual}
                    onChange={(e) => {
                        const nuevoTiempo = e.target.value;
                        if (audioActual) {
                            audioActual.currentTime = nuevoTiempo;
                            setTiempoActual(nuevoTiempo);
                        }
                    }}
                    className="barra-progreso"
                    style={{
                        '--progress': `${(tiempoActual / duracion) * 100}%`,
                    }}
                />
                <div className='reprodutor-datos'>
                    <div>
                        <img src={infoActual.url} alt="Imagen de la canción" />
                    </div>
                    <div>
                        <h2 title={infoActual.nombre}>{infoActual.nombre}</h2>
                        <span title={infoActual.artista}>{infoActual.artista}</span>
                    </div>
                    <div>
                        {!muteado && (
                            <button className='volumen-active' onClick={toggleMute}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none"><path d="M5.08 9H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h.08a2 2 0 0 1 1.519.698l3.642 4.25c.604.704 1.759.277 1.759-.651V4.703c0-.928-1.155-1.355-1.76-.65L6.6 8.301A2 2 0 0 1 5.08 9zm13.556-4.725a1 1 0 1 0-1.377 1.45c3.655 3.472 3.655 9.078 0 12.55a1 1 0 1 0 1.377 1.45c4.485-4.26 4.485-11.19 0-15.45zm-2.947 2.8a1 1 0 1 0-1.378 1.45c2.027 1.925 2.027 5.025 0 6.95a1 1 0 1 0 1.378 1.45c2.857-2.714 2.857-7.136 0-9.85z" fill="currentColor" /></g></svg>
                            </button>
                        )}
                        {muteado && (
                            <button className='volumen-desactive' onClick={toggleMute}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none"><path d="M13 4.703c0-1.857-2.31-2.711-3.519-1.301L5.84 7.65a1 1 0 0 1-.76.35H5a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h.08a1 1 0 0 1 .76.35l.712-.612l-.713.611l3.642 4.25c1.209 1.41 3.519.555 3.519-1.302V4.703zm3.293 4.59a1 1 0 0 1 1.414 0L19 10.586l1.293-1.293a1 1 0 1 1 1.414 1.414L20.414 12l1.293 1.293a1 1 0 0 1-1.414 1.414L19 13.414l-1.293 1.293a1 1 0 0 1-1.414-1.414L17.586 12l-1.293-1.293a1 1 0 0 1 0-1.414z" fill="currentColor" /></g></svg>
                            </button>
                        )}
                        <input
                            type="range"
                            className="slider"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volumen}
                            onChange={manejarVolumen}
                            style={{ '--progress': `${volumen * 100}%` }}
                        />
                    </div>
                </div>

                <div className='reprodutor-control'>
                    <button onClick={() => {
                        reproducirSiguiente(posicion, "back");
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1025 1024"><path fill="currentColor" d="m962.428 1013l-563-463q-15-15-15-37.5t15-38.5l563-463q25-27 62 13v976q-37 40-62 13m-834 11q-53 0-90.5-37.5T.428 896V128q0-53 37.5-90.5t90.5-37.5t90.5 37.5t37.5 90.5v768q0 53-37.5 90.5t-90.5 37.5" /></svg>
                    </button>

                    {reproduciendo ? (
                        <button onClick={togglePlayPause}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1025 1024"><path fill="currentColor" d="M896.428 1024h-128q-53 0-90.5-37.5t-37.5-90.5V128q0-53 37.5-90.5t90.5-37.5h128q53 0 90.5 37.5t37.5 90.5v768q0 53-37.5 90.5t-90.5 37.5m-640 0h-128q-53 0-90.5-37.5T.428 896V128q0-53 37.5-90.5t90.5-37.5h128q53 0 90.5 37.5t37.5 90.5v768q0 53-37.5 90.5t-90.5 37.5" /></svg>
                        </button>
                    ) : (
                        <button onClick={togglePlayPause}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6" /></svg>
                        </button>
                    )}

                    <button onClick={() => {
                        reproducirSiguiente(posicion, "next");;
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1025 1024"><path fill="currentColor" d="M896.62 1024q-53 0-90.5-37.5t-37.5-90.5V128q0-53 37.5-90.5T896.62 0t90.5 37.5t37.5 90.5v768q0 53-37.5 90.5t-90.5 37.5m-834-11q-25 27-62-13V24q37-40 62-13l563 463q15 16 15 38.5t-15 37.5z" /></svg>
                    </button>
                </div>

                <div className='reprodutor-configuracion'>
                    <button>
                        <svg id='favorito-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z" /></svg>
                    </button>
                    <button onClick={repetirAudio}>
                        <svg className='boton-repetir' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96h160v32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32v32H160C71.6 64 0 135.6 0 224m512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96H192v-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6v-32h160c88.4 0 160-71.6 160-160z" /></svg> <span className='boton-repetir-span'>1</span>
                    </button>
                    <button onClick={aleatorioPlay}>
                        <svg className='boton-aleatorio' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 472"><path fill="currentColor" d="M70 365q74 0 118-57q0-4-5-7l-19-38q-13 27-38.5 43.5T70 323H21q-8 0-14.5 6.5T0 344t6.5 14.5T21 365zM442 9q-16-14-30 0q-15 15 0 30l27 28h-83q-73 0-117 57q0 3 4 7l19 38q13-27 38.5-43.5T356 109h83l-27 28q-15 15 0 30q6 6 15 6q7 0 15-6l64-64q13-15 0-30zm0 256q-16-14-30 0q-15 15 0 30l27 28h-83q-30 0-56-16.5T260 263l-23-47l-24-47l-10-19q-18-38-54-60.5T70 67H21q-8 0-14.5 6.5T0 88t6.5 14.5T21 109h49q64 0 96 60l24 47l23 47l11 19q20 38 55.5 60.5T358 365h84l-28 28q-15 15 0 30q6 6 15 6q8 0 15-6l64-64q13-15 0-30z" /></svg>
                    </button>
                    {/*                     <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-3 5h-2v5.37c0 1.27-.9 2.44-2.16 2.6a2.505 2.505 0 0 1-2.8-2.95c.2-1.1 1.18-1.95 2.3-2.02c.63-.04 1.2.16 1.66.51V6c0-.55.45-1 1-1h2c.55 0 1 .45 1 1s-.45 1-1 1M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1" /></svg>
                    </button> */}
                    <button onClick={() => {
                        desplegarReproductor();
                        aplicarLista();
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 9" ><path fill="currentColor" d="M7.18 1.38L3.03 6.21c-.6.7-.1 1.79.82 1.79h8.29c.93 0 1.42-1.09.82-1.79L8.82 1.38c-.43-.5-1.21-.5-1.64 0" /></svg>
                    </button>
                </div>

            </div>

            <div className='reproductor-contenido-expandido'>
                <div className='fondo-reproduccion'>
                    <div></div>
                    <img src={infoActual.url} alt="" />
                </div>

                <div className='reproductor-actual'>
                    <button className='reproductor-actual-volver' onClick={desplegarReproductor}><IoCaretBack />Volver</button>

                    <div className='reproductor-actual-contenido'>
                        <div className='reproductor-actual-1'>
                            <img id='disco-musical' className='girar-disco' src={disco} alt="imagen de disco musical" />
                            <img id='img-reproduccion' className='girar-disco' src={infoActual.url} alt="imagen de la canción en reproducción" />
                            <div>
                                <button onClick={() => {
                                    reproducirSiguiente(posicion, "back");
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1025 1024"><path fill="currentColor" d="m962.428 1013l-563-463q-15-15-15-37.5t15-38.5l563-463q25-27 62 13v976q-37 40-62 13m-834 11q-53 0-90.5-37.5T.428 896V128q0-53 37.5-90.5t90.5-37.5t90.5 37.5t37.5 90.5v768q0 53-37.5 90.5t-90.5 37.5" /></svg>
                                </button>

                                {reproduciendo ? (
                                    <button onClick={togglePlayPause}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1025 1024"><path fill="currentColor" d="M896.428 1024h-128q-53 0-90.5-37.5t-37.5-90.5V128q0-53 37.5-90.5t90.5-37.5h128q53 0 90.5 37.5t37.5 90.5v768q0 53-37.5 90.5t-90.5 37.5m-640 0h-128q-53 0-90.5-37.5T.428 896V128q0-53 37.5-90.5t90.5-37.5h128q53 0 90.5 37.5t37.5 90.5v768q0 53-37.5 90.5t-90.5 37.5" /></svg>
                                    </button>
                                ) : (
                                    <button onClick={togglePlayPause}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6" /></svg>
                                    </button>
                                )}

                                <button onClick={() => {
                                    reproducirSiguiente(posicion, "next");
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1025 1024"><path fill="currentColor" d="M896.62 1024q-53 0-90.5-37.5t-37.5-90.5V128q0-53 37.5-90.5T896.62 0t90.5 37.5t37.5 90.5v768q0 53-37.5 90.5t-90.5 37.5m-834-11q-25 27-62-13V24q37-40 62-13l563 463q15 16 15 38.5t-15 37.5z" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className='reproductor-actual-2'>
                            <div className='reproductor-actual-2-nombre'>
                                <h2>{infoActual.nombre}</h2>
                                <span>{infoActual.artista}</span>

                            </div>
                            <div className='reproductor-actual-2-tiempo'>
                                <span>{formatearTiempo(tiempoActual)}</span>
                                <span>{formatearTiempo(duracion)}</span>
                            </div>
                            <input
                                type="range"
                                className="expandido-barra-progreso"
                                min="0"
                                max={duracion}
                                value={tiempoActual}
                                onChange={(e) => {
                                    const nuevoTiempo = e.target.value;
                                    if (audioActual) {
                                        audioActual.currentTime = nuevoTiempo;
                                        setTiempoActual(nuevoTiempo);
                                    }
                                }}
                                style={{
                                    '--progress': `${(tiempoActual / duracion) * 100}%`,
                                }}
                            />
                            <div className='reproductor-actual-2-botones'>

                                <div>
                                    {!muteado && (
                                        <button className='volumen-active' onClick={toggleMute}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none"><path d="M5.08 9H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h.08a2 2 0 0 1 1.519.698l3.642 4.25c.604.704 1.759.277 1.759-.651V4.703c0-.928-1.155-1.355-1.76-.65L6.6 8.301A2 2 0 0 1 5.08 9zm13.556-4.725a1 1 0 1 0-1.377 1.45c3.655 3.472 3.655 9.078 0 12.55a1 1 0 1 0 1.377 1.45c4.485-4.26 4.485-11.19 0-15.45zm-2.947 2.8a1 1 0 1 0-1.378 1.45c2.027 1.925 2.027 5.025 0 6.95a1 1 0 1 0 1.378 1.45c2.857-2.714 2.857-7.136 0-9.85z" fill="currentColor" /></g></svg>
                                        </button>
                                    )}
                                    {muteado && (
                                        <button className='volumen-desactive' onClick={toggleMute}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none"><path d="M13 4.703c0-1.857-2.31-2.711-3.519-1.301L5.84 7.65a1 1 0 0 1-.76.35H5a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h.08a1 1 0 0 1 .76.35l.712-.612l-.713.611l3.642 4.25c1.209 1.41 3.519.555 3.519-1.302V4.703zm3.293 4.59a1 1 0 0 1 1.414 0L19 10.586l1.293-1.293a1 1 0 1 1 1.414 1.414L20.414 12l1.293 1.293a1 1 0 0 1-1.414 1.414L19 13.414l-1.293 1.293a1 1 0 0 1-1.414-1.414L17.586 12l-1.293-1.293a1 1 0 0 1 0-1.414z" fill="currentColor" /></g></svg>
                                        </button>
                                    )}
                                    <input
                                        type="range"
                                        className="expandido-slider"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volumen}
                                        onChange={manejarVolumen}
                                        style={{ '--progress': `${volumen * 100}%` }}
                                    />
                                </div>

                                <div>
                                    <button>
                                        <svg id='favorito-icon-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z" /></svg>
                                    </button>
                                    <button onClick={repetirAudio}>
                                        <svg className='boton-repetir' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96h160v32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32v32H160C71.6 64 0 135.6 0 224m512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96H192v-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6v-32h160c88.4 0 160-71.6 160-160z" /></svg><span className='boton-repetir-span'>1</span>
                                    </button>
                                    <button onClick={() => {
                                        aleatorioPlay();
                                        aplicarLista();
                                    }}>
                                        <svg className='boton-aleatorio' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 472"><path fill="currentColor" d="M70 365q74 0 118-57q0-4-5-7l-19-38q-13 27-38.5 43.5T70 323H21q-8 0-14.5 6.5T0 344t6.5 14.5T21 365zM442 9q-16-14-30 0q-15 15 0 30l27 28h-83q-73 0-117 57q0 3 4 7l19 38q13-27 38.5-43.5T356 109h83l-27 28q-15 15 0 30q6 6 15 6q7 0 15-6l64-64q13-15 0-30zm0 256q-16-14-30 0q-15 15 0 30l27 28h-83q-30 0-56-16.5T260 263l-23-47l-24-47l-10-19q-18-38-54-60.5T70 67H21q-8 0-14.5 6.5T0 88t6.5 14.5T21 109h49q64 0 96 60l24 47l23 47l11 19q20 38 55.5 60.5T358 365h84l-28 28q-15 15 0 30q6 6 15 6q8 0 15-6l64-64q13-15 0-30z" /></svg>
                                    </button>
                                    {/*                                     <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-3 5h-2v5.37c0 1.27-.9 2.44-2.16 2.6a2.505 2.505 0 0 1-2.8-2.95c.2-1.1 1.18-1.95 2.3-2.02c.63-.04 1.2.16 1.66.51V6c0-.55.45-1 1-1h2c.55 0 1 .45 1 1s-.45 1-1 1M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1" /></svg>
                                    </button> */}
                                    <button onClick={desplegarReproductor}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="currentColor" stroke="currentColor" strokeLinejoin="round" strokeWidth="4" d="M36 19L24 31L12 19z" /></svg>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

                <div className='reproductor-musicas'>
                    <h2>En cola</h2>
                    <div className='reproductor-musicas-lista'>                        {
                        todos.map((item, index) => {
                            return (
                                <div className='musicas-item' key={index}>
                                    <button onClick={() => playAudio(item.id, {
                                        nombre: item.nombre,
                                        artista: item.artista,
                                        url: item.url
                                    })}>
                                        <FaPlay />
                                    </button>
                                    <img src={item.url} alt="" />
                                    <div>
                                        <h3>{item.nombre}</h3>
                                        <span>{item.artista}</span>
                                    </div>
                                    {
                                        posicion === item.id
                                            ? <span>En reproducción</span> : <span></span>
                                    }
                                    <span>
                                        {audioRefs.current[item.id]?.duration
                                            ? formatearTiempo(audioRefs.current[item.id].duration)
                                            : '00:00'}
                                    </span>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>

            </div>

        </footer>
    );
};

export default Reproductor;