import React, {
    useRef,
    useState,
    useEffect,
    useImperativeHandle,
    forwardRef,
} from 'react';

const TRACK = {
    url: '/src/assets/Book-of-Circus-Black-Butler.mp3',
    name: 'Book of Circus',
    artist: 'Black Butler OST',
}

export type MusicPlayerHandle = {
    play: () => void;
    pause: () => void;
    reset: () => void;
};

const MusicPlayer = forwardRef<MusicPlayerHandle>((_props, ref) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    useImperativeHandle(ref, () => ({
        play: () => {
            if (audioRef.current) {
                audioRef.current.play();
                setIsPlaying(true);
            }
        },
        pause: () => {
            if (audioRef.current) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        },
        reset: () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setProgress(0);
                setIsPlaying(false);
            }
        },
    }));


    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        const current = audioRef.current.currentTime;
        const total = audioRef.current.duration;
        setProgress((current / total) * 100);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return;
        const newProgress = parseFloat(e.target.value);
        audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
        setProgress(newProgress);
    };

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    useEffect(() => {
        if (!audioRef.current) return;
        const handleLoadedMetadata = () => setDuration(audioRef.current!.duration);
        audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
        return () => audioRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
    }, []);

    return (
        <div className="relative flex flex-col items-center group/he select-none">

            {/* 🎵 Disco grande sin hover */}
            <div className="absolute -top-12 z-10 transition-all duration-300 opacity-100 animate-[spin_3s_linear_infinite] group-hover/he:opacity-0">
                <img
                    src="/src/assets/lady_ciel.webp"
                    alt="Lady Ciel"
                    className="w-24 h-24 rounded-full object-cover shadow-lg"
                />
            </div>

            {/* 🎵 Disco pequeño giratorio en hover */}
            <div className="absolute -top-6 -left-6 z-40 opacity-0 group-hover/he:opacity-100 group-hover/he:animate-[spin_3s_linear_infinite] transition-all duration-300">
                <img
                    src="/src/assets/lady_ciel.webp"
                    alt="Lady Ciel"
                    className="w-16 h-16 rounded-full object-cover shadow-md"
                />
            </div>

            {/* 🎛️ Contenedor principal */}
            <div className="z-30 flex flex-col w-40 h-20 transition-all duration-300 bg-white shadow-md group-hover/he:h-40 group-hover/he:w-72 rounded-2xl shadow-zinc-400">
                <div className="flex flex-row w-full h-0 group-hover/he:h-20">
                    <div className="flex flex-col justify-center w-full pl-3 text-nowrap overflow-hidden">
                        <p className="text-xl font-bold">{TRACK.name}</p>
                        <p className="text-zinc-600">{TRACK.artist}</p>
                    </div>
                </div>

                {/* 🎚️ Barra de progreso */}
                <div className="flex flex-row mx-3 mt-3 bg-indigo-100 rounded-md min-h-4 group-hover/he:mt-0 items-center">
                    <span className="hidden pl-3 text-sm text-zinc-600 group-hover/he:inline-block">
                        {formatTime((progress / 100) * duration)}
                    </span>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={progress}
                        onChange={handleSeek}
                        className="w-24 group-hover/he:w-full flex-grow h-1 mx-2 my-auto bg-gray-300 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-zinc-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                    />
                    <span className="hidden pr-3 text-sm text-zinc-600 group-hover/he:inline-block">
                        {formatTime(duration)}
                    </span>
                </div>

                {/* 🎛️ Controles */}
                <div className="flex flex-row items-center justify-center flex-grow mx-3 space-x-5">
                    <button onClick={togglePlay} className="flex items-center justify-center w-12 h-full">
                        {isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="6" y="4" width="4" height="16" />
                                <rect x="14" y="4" width="4" height="16" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* 🔊 Audio oculto */}
            <audio
                ref={audioRef}
                src={TRACK.url}
                onTimeUpdate={handleTimeUpdate}
                preload="metadata"
            />
        </div>
    );
});
export default MusicPlayer;
