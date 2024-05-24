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
            audioRef.current.addEventListener("loadedmetadata", () => {
                setDuration(audioRef.current.duration);
            });
    
            const interval = setInterval(() => {
                if (!audioRef.current.paused) {
                    const time = audioRef.current.currentTime;
                    setCurrentTime(time);
                }
            }, 1000);
    
            return () => {
                audioRef.current.removeEventListener("loadedmetadata", () => {});
                clearInterval(interval);
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

    const previousMusic = () => {
        if (musicIndex > 0) {
            setMusicIndex(prev => prev - 1);
            setAudio(`/musicas/${musicPlaylist[musicIndex - 1]}`);
        }
    };

    const nextMusic = () => {
        if (musicIndex < musicPlaylist.length - 1) {
            setMusicIndex(prev => prev + 1);
            setAudio(`/musicas/${musicPlaylist[musicIndex + 1]}`);
        }
    };

    return (
        <div className="w-96 h-14 px-8 flex-col justify-center items-center gap-4 inline-flex">
            <div className="flex justify-center items-center gap-8">
                <div className="flex justify-start items-start gap-2.5">
                    <div className="relative">
                        <PreviousIcon onClick={previousMusic} />
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
                        <NextIcon onClick={nextMusic} />
                    </div>
                </div>
            </div>
            <div className="self-stretch justify-start items-center gap-8 inline-flex">
                <div className="text-center text-xs text-white font-semibold leading-tight tracking-wide">
                    <p>{formatTime(duration)}</p>
                </div>
                <div className="w-96 h-1 relative bg-neutral-600 rounded-full">
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
