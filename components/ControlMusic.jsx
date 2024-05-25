import { useRef, useState, useEffect } from "react";
import PreviousIcon from "./icons/PreviousIcon";
import PlayIcon from "./icons/PlayIcon";
import PauseIcon from "./icons/PauseIcon";
import NextIcon from "./icons/NextIcon";
import { formatTime } from "@/util/formatTime";

export default function ControlMusic() {
    const [musicPlaylist, setMusicPlaylist] = useState([]);
    const [audio, setAudio] = useState(null);
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [musicIndex, setMusicIndex] = useState(0);

    useEffect(() => {
        // Receber música do Electron
        const receiveMusic = (event, music) => {
            setMusicPlaylist(prev => [...prev, music]);
            if (!audioRef.current.currentSrc) {
                setAudio(`/musicas/${music}`);
                audioRef.current.load();
                setCurrentTime(audioRef.current.currentTime);
            }
        };

        window.electronAPI.ReceiveFromElectron("music-playable", receiveMusic);

        return () => {
            window.electronAPI.RemoveListener("music-playable", receiveMusic);
        };
    }, []);

    useEffect(() => {
        // Atualizar a duração da música e o tempo atual
        if (audioRef.current) {
            const handleLoadedMetadata = () => {
                setDuration(audioRef.current.duration);
            };

            audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

            const interval = setInterval(() => {
                if (!audioRef.current.paused) {
                    const time = audioRef.current.currentTime;
                    setCurrentTime(time);
                }
            }, 1000);

            return () => {
                audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
                clearInterval(interval);
            };
        }
    }, [audio]);

    useEffect(() => {
        // Adicionar ouvinte para detectar quando a música termina
        if (audioRef.current) {
            const handleEnded = () => {
                handleNext();
            };

            audioRef.current.addEventListener("ended", handleEnded);

            return () => {
                audioRef.current.removeEventListener("ended", handleEnded);
            };
        }
    }, [audio]);

    const handlePlay = () => {
        if (audio !== null) {
            audioRef.current.play();
            document.getElementById("play").classList.remove("flex");
            document.getElementById("play").classList.add("hidden");
            document.getElementById("pause").classList.add("flex");
            document.getElementById("pause").classList.remove("hidden");
        }
    };

    const handlePause = () => {
        if (audio !== null) {
            audioRef.current.pause();
            document.getElementById("pause").classList.remove("flex");
            document.getElementById("pause").classList.add("hidden");
            document.getElementById("play").classList.add("flex");
            document.getElementById("play").classList.remove("hidden");
        }
    };

    function handleProgressBarClick(event) {
        if (audioRef.current) {
            const progressBar = event.currentTarget;
            const clickPosition = event.nativeEvent.offsetX;
            const totalWidth = progressBar.clientWidth;
            const percentage = clickPosition / totalWidth;
            const time = audioRef.current.duration * percentage;
            audioRef.current.currentTime = time;
        }
    }

    function handlePrevious() {
        if (musicIndex > 0) {
            setMusicIndex(prevIndex => {
                const newIndex = prevIndex - 1;
                setAudio(`/musicas/${musicPlaylist[newIndex]}`);
                audioRef.current.load();
                audioRef.current.play();
                setCurrentTime(audioRef.current.currentTime);
                return newIndex;
            });
        }
    }

    function handleNext() {
        if (musicIndex < musicPlaylist.length - 1) {
            setMusicIndex(prevIndex => {
                const newIndex = prevIndex + 1;
                setAudio(`/musicas/${musicPlaylist[newIndex]}`);
                audioRef.current.load();
                audioRef.current.play();
                setCurrentTime(audioRef.current.currentTime);
                return newIndex;
            });
        }
    }

    return (
        <div className="w-96 h-14 px-8 flex-col justify-center items-center gap-4 inline-flex">
            <div className="flex justify-center items-center gap-8">
                <div className="flex justify-start items-start gap-2.5">
                    <div className="relative">
                        <PreviousIcon onClick={handlePrevious} />
                    </div>
                </div>
                <div id="play" className="flex justify-start items-start gap-2.5">
                    <div className="w-4 h-4 relative">
                        <PlayIcon onClick={handlePlay} />
                    </div>
                </div>
                <audio ref={audioRef}>
                    <source src={audio} type="audio/mp3" />
                </audio>
                <div id="pause" className="hidden justify-start items-start gap-2.5">
                    <div className="relative">
                        <PauseIcon onClick={handlePause} />
                    </div>
                </div>
                <div className="w-4 h-4 justify-start items-start gap-2.5 flex">
                    <div className="w-4 h-4 relative">
                        <NextIcon onClick={handleNext} />
                    </div>
                </div>
            </div>
            <div className="self-stretch justify-start items-center gap-8 inline-flex">
                <div className="text-center text-xs text-white font-semibold leading-tight tracking-wide">
                    <p>{formatTime(duration)}</p>
                </div>
                <div 
                    className="w-96 h-1 relative bg-neutral-600 rounded-full"
                    onClick={handleProgressBarClick}
                >
                    <div
                        id="progress-bar"
                        className="h-1 rounded-full bg-white absolute top-1/2 transform -translate-y-1/2"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                </div>
                <div className="text-center text-xs text-white font-semibold leading-tight tracking-wide">
                    {formatTime(currentTime)}
                </div>
            </div>
        </div>
    );
}
