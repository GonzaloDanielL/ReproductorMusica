import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';
import datos from '../data/datos';

const AudioLoader = () => {
    const { audioRefs, setDuracion, setTiempoActual } = useContext(AudioContext);

    return (
        <>
            {datos.todas.map((item) => (
                <audio
                    key={item.id}
                    ref={(el) => (audioRefs.current[item.id] = el)}
                    onTimeUpdate={(e) => setTiempoActual(e.target.currentTime)}
                    onLoadedMetadata={(e) => setDuracion(e.target.duration)}
                >
                    <source src={item.song} type="audio/mpeg" />
                </audio>
            ))}
        </>
    );
};

export default AudioLoader;