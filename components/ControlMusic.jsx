import { useRef, useState, useEffect } from "react";
import PreviousIcon from "./icons/PreviousIcon";
import PlayIcon from "./icons/PlayIcon";
import PauseIcon from "./icons/PauseIcon";
import NextIcon from "./icons/NextIcon";

export default function ControlMusic() {
    const [musicPlaylist, setMusicPlaylist] = useState([]);
    const [audio, setAudio] = useState(null);
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [musicIndex, setMusicIndex] = useState(0);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.ontimeupdate = () => {
                setCurrentTime(audioRef.current.currentTime);
            };
            audioRef.current.onloadedmetadata = () => {
                setDuration(audioRef.current.duration);
            };
        }
    }, []);

    const playMusic = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const pauseMusic = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    const nextMusic = () => {
        if (musicIndex < musicPlaylist.length - 1) {
            setMusicIndex(musicIndex + 1);
            setAudio(musicPlaylist[musicIndex + 1]);
        }
    };

    const previousMusic = () => {
        if (musicIndex > 0) {
            setMusicIndex(musicIndex - 1);
            setAudio(musicPlaylist[musicIndex - 1]);
        }
    };

    useEffect(() => {
        if (audio) {
            audioRef.current.src = audio;
            playMusic();
        }
    }, [audio]);

    return (
        <div className="w-96 h-14 px-8 flex-col justify-center items-center gap-4 inline-flex">
            <div className="flex justify-center items-center gap-8">
                <div className="flex justify-start items-start gap-2.5">
                    <div className="relative">
                        <PreviousIcon onClick={previousMusic} />
                    </div>
                </div>
                <div id="play" className="flex justify-start items-start gap-2.5">
                    <div className="relative">
                        <PlayIcon onClick={playMusic} />
                    </div>
                </div>
                <audio ref={audioRef}>
                    <source type="audio/mp3" />
                </audio>
                <div id="pause" className="hidden justify-start items-start gap-2.5">
                    <div className="relative">
                        <PauseIcon onClick={pauseMusic} />
                    </div>
                </div>
                <div className="flex justify-start items-start gap-2.5">
                    <div className="relative">
                        <NextIcon onClick={nextMusic} />
                    </div>
                </div>
            </div>
            <div className="self-stretch flex justify-between items-center gap-8">
                <div className="text-center text-xs text-white font-semibold leading-tight tracking-wide">
                    <p>{new Date(currentTime * 1000).toISOString().substr(14, 5)}</p>
                </div>
                <div className="w-96 h-1 relative bg-neutral-600 rounded-full">
                    <div
                        id="progress-bar"
                        className="h-1 w-full rounded-full bg-white absolute top-1/2 transform -translate-y-1/2"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                </div>
                <div className="text-center text-xs text-white font-semibold leading-tight tracking-wide">
                    <p>{new Date(duration * 1000).toISOString().substr(14, 5)}</p>
                </div>
            </div>
        </div>
    );
}
