import React from "react";
import AdicionarIcon from "./icons/AdicionarIcon";
import AlbumVazioIcon from "./icons/AlbumVazioIcon";
import ExcluirIcon from "./icons/ExcluirIcon";

export default function MusicInList({ music }) {
  function handleExcluirMusica() {
    window.electronAPI.SendToElectron("music-delete", music);
  }

  function handleAdicionarMusica() {
    window.electronAPI.SendToElectron("music-to-play", music);
  }

  return (
    <div className="m-5 p-2 flex flex-row border border-gray-500 w-full gap-2">
      <AlbumVazioIcon />
      <div className="flex justify-between w-full">
        <div>
          <h1 className="text-white">Nome</h1>
          <h2 className="text-white">{music}</h2>
        </div>
        <div className="flex flex-row justify-center gap-5 h-full">
          <AdicionarIcon onClick={handleAdicionarMusica} />
          <ExcluirIcon onClick={handleExcluirMusica} />
        </div>
      </div>
    </div>
  );
}
