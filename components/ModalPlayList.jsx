import { useState } from "react";

export default function ModalPlayList() {
    const [musicPlayList, setMusicPlaylist] = useState([]);

    return (
        <div id="modal-play-list" className="absolute flex flex-col right-0 bottom-20 bg-[#212124] w-80 h-auto border-solid mr-2">
            <h1 className="text-center text-white">PlayList</h1>
            <div className="m-4 bg-[#171719]">
                {musicPlayList.length === 0 ? (
                    <p className="text-zinc-400">Vazio</p>
                ) : (
                    musicPlayList.map((music, index) => {
                        return (
                            <p className="text-white" key={index}>
                                {music}
                            </p>
                        );
                    })
                )}
            </div>
        </div>
    );
}
