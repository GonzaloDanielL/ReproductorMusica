import { createContext, useRef, useState, useEffect } from 'react';

export const AudioContext = createContext();

import datos from '../data/datos.json'

export const AudioProvider = ({ children }) => {
    const audioRefs = useRef({});
    const listaRef = useRef();
    const posicionRef = useRef();
    const repetirRef = useRef();
    const aleatorioRef = useRef();
    const colaAleatoriaRef = useRef([]);
    const colaRef = useRef([]);

    const [audioActual, setAudioActual] = useState(null);
    const [reproduciendo, setReproduciendo] = useState(false);
    const [volumen, setVolumen] = useState(1);
    const volumenRef = useRef(volumen);
    const [infoActual, setInfoActual] = useState({ nombre: 'Limits', artista: 'Bad Omens', url: '/imgs/Limits.webp' });
    const [duracion, setDuracion] = useState(0);
    const [tiempoActual, setTiempoActual] = useState(0);
    const [lista, setLista] = useState();
    const [posicion, setPosicion] = useState(0);
    const [repetir, setRepetir] = useState("no");
    const [aleatorio, setAleatorio] = useState(false);
    const [cola, setCola] = useState(datos.todas);

    useEffect(() => {
        aleatorioRef.current = aleatorio;
        if (!aleatorio) {
            colaAleatoriaRef.current = [];
        }
    }, [aleatorio]);

    useEffect(() => {
        colaRef.current = cola;
    }, [cola]);

    useEffect(() => {
        repetirRef.current = repetir;
    }, [repetir]);

    useEffect(() => {
        posicionRef.current = posicion;

        for (let i = 0; i < cola.length; i++) {
            if (cola[i].id === posicion) {
                if (cola[i].favorito === true) {
                    document.getElementById('favorito-icon').style.color = "#EEEEEE";
                    document.getElementById('favorito-icon-2').style.color = "#EEEEEE";
                } else {
                    document.getElementById('favorito-icon').style.color = "#868686";
                    document.getElementById('favorito-icon-2').style.color = "#868686";
                }
            }
        }

    }, [posicion]);

    useEffect(() => {
        listaRef.current = lista;
        setAleatorio(false);
        setRepetir("no");
        document.querySelectorAll('.boton-repetir').forEach(item => item.style.color = "#868686");
        document.querySelectorAll('.boton-aleatorio').forEach(item => item.style.color = "#868686");

        if (listaRef.current === "recientes") {
            setCola(datos.recientes);
        } else if (listaRef.current === "favoritos") {
            setCola(datos.favoritos);
        }
        else {
            setCola(datos.todas);
        }

    }, [lista]);

    useEffect(() => {
        volumenRef.current = volumen;
    }, [volumen]);

    // funcion para reproducir la canción
    const playAudio = (key, data) => {
        const nuevoAudio = audioRefs.current[key];
        setPosicion(key);

        if (!nuevoAudio) return;

        if (audioActual && audioActual !== nuevoAudio) {
            audioActual.pause();
            audioActual.currentTime = 0;
        }

        setDuracion(0);
        setTiempoActual(0);

        nuevoAudio.volume = volumenRef.current;
        nuevoAudio.play();
        setAudioActual(nuevoAudio);

        // Limpia cualquier evento anterior si existe
        if (audioActual) {
            audioActual.onended = null;
            audioActual.onpause = null;
            audioActual.onplay = null;
        }

        nuevoAudio.onended = () => {
            if (repetirRef.current == "una") {
                nuevoAudio.play();

            } else {
                reproducirSiguiente(key, "normal");
            }
        };

        setReproduciendo(true);
        setInfoActual(data);

        if (nuevoAudio.readyState >= 1) {
            setDuracion(nuevoAudio.duration);
        } else {
            nuevoAudio.onloadedmetadata = () => {
                setDuracion(nuevoAudio.duration);
            };
        }

        document.getElementById('disco-musical').style.animationPlayState = "running";
        document.getElementById('img-reproduccion').style.animationPlayState = "running";
        document.getElementById("reprodutor").style.display = "block";
        document.getElementById("reprodutor").style.bottom = "0px";
    };

    // funcion para reproducir la siguiente canción
    const reproducirSiguiente = (keyActual, tipo) => {
        if (aleatorioRef.current) {
            const cola = colaAleatoriaRef.current;
            const indexActual = cola.findIndex(item => item.id === keyActual);
            let siguiente

            if (tipo === "normal" || tipo === "next") {
                siguiente = cola[indexActual + 1];
            } else {
                siguiente = cola[indexActual - 1];
            }

            if (siguiente) {
                playAudio(siguiente.id, siguiente);

            } else if (repetirRef.current === "todo") {
                const listaOriginal = listaRef.current === "recientes" ? datos.recientes : listaRef.current === "favoritos" ? datos.favoritos : datos.todas;
                const nuevaCola = generarListaAleatoria(listaOriginal, keyActual);
                const siguiente = nuevaCola[1];
                if (siguiente) playAudio(siguiente.id, siguiente);

            } else {
                setReproduciendo(false);

                if (tipo === "back") {
                    const ultimo = colaAleatoriaRef.current[colaAleatoriaRef.current.length - 1];
                    playAudio(ultimo.id, ultimo);

                } else if (tipo == "next") {
                    const primera = colaAleatoriaRef.current[0];
                    playAudio(primera.id, primera);

                } else {
                    setReproduciendo(false);
                }
            }

            return;
        }

        // MODO NORMAL
        const listaOriginal = listaRef.current === "recientes" ? datos.recientes : listaRef.current === "favoritos" ? datos.favoritos : datos.todas;
        const indexActual = listaOriginal.findIndex(item => item.id === keyActual);
        let siguiente

        if (tipo === "normal" || tipo === "next") {
            siguiente = listaOriginal[indexActual + 1];
        } else {
            siguiente = listaOriginal[indexActual - 1];
        }

        if (siguiente) {
            playAudio(siguiente.id, siguiente);

        } else if (repetirRef.current === "todo") {
            const primera = listaOriginal[0];
            playAudio(primera.id, primera);

        } else {
            if (tipo === "back") {
                const ultimo = listaOriginal[listaOriginal.length - 1];
                playAudio(ultimo.id, ultimo);

            } else if (tipo == "next") {
                const primera = listaOriginal[0];
                playAudio(primera.id, primera);

            } else {
                setReproduciendo(false);
            }
        }
    };


    const generarListaAleatoria = (listaOriginal, idActual) => {
        let mezclada = [...listaOriginal];

        // mover concion actual al inicio de la lista
        if (idActual) {
            const actual = listaOriginal.find(item => item.id === idActual);
            const resto = listaOriginal.filter(item => item.id !== idActual);

            // Fisher-Yates Shuffle
            for (let i = resto.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [resto[i], resto[j]] = [resto[j], resto[i]];
            }

            mezclada = [actual, ...resto];
        } else {
            // Si no hay cancion actual, desordenamos todo
            for (let i = mezclada.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [mezclada[i], mezclada[j]] = [mezclada[j], mezclada[i]];
            }
        }

        //para uso externo
        colaAleatoriaRef.current = mezclada;
        setCola(colaAleatoriaRef.current);

        return mezclada;
    };




    return (
        <AudioContext.Provider value={{
            audioRefs,
            audioActual,
            reproduciendo,
            setReproduciendo,
            volumen,
            setVolumen,
            playAudio,
            reproducirSiguiente,
            infoActual,
            duracion,
            setDuracion,
            tiempoActual,
            setTiempoActual,
            setLista,
            lista,
            posicion,
            repetir,
            setRepetir,
            aleatorio,
            setAleatorio,
            generarListaAleatoria,
            cola,
            setCola,
            aleatorioRef,
            colaRef
        }}>

            {children}
        </AudioContext.Provider>
    );
};
