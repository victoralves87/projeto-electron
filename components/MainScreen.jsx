import ImportFiles from "./ImportFiles";
import MusicList from "./MusicList";

export default function MainScreen() {
    return (
        <section className="flex flex-row h-full">
            <div className="w-1/3 bg-gray-900 p-8">
                <ImportFiles />
            </div>
            <main className="flex flex-col flex-1 mt-8 p-4 overflow-y-auto bg-gray-800">
                <h1 className="text-white text-2xl mb-4">Lista de Músicas</h1>
                <MusicList />
            </main>
        </section>
    );
}
