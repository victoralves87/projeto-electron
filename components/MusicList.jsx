import { useState, useEffect } from "react";
import MusicInList from "./MusicInList";

export default function MusicList() {
    const [musicList, setMusicList] = useState([]);

    useEffect(() => {
        const fetchMusicList = async () => {
            try {
                await window.electronAPI.SendToElectron("music-get");
                window.electronAPI.ReceiveFromElectron("music-list", (event, arg) => {
                    setMusicList(arg);
                });
            } catch (error) {
                console.log(`Erro ao obter lista de músicas: ${error}`);
            }
        };

        fetchMusicList();

        // Limpeza do listener quando o componente desmonta
        return () => {
            window.electronAPI.RemoveListener("music-list");
        };
    }, []);

    return (
        <div className="w-11/12">
            <h2 className="ml-5 text-white text-2xl">Lista de Músicas</h2>
            {musicList.length === 0 ? (
                <p className="text-zinc-400">Vazio</p>
            ) : (
                musicList.map((music, index) => {
                    return <MusicInList key={index} music={music} />;
                })
            )}
        </div>
    );
}
