import ImportFiles from "./ImportFiles";
import MusicList from "./MusicList";

export default function MainScreen(){
    return(
        <section className="grow flex flex-row bg-[#171719]">
            <div className="w-1/6 bg-[#212124] p-10">
                <ImportFiles></ImportFiles>
            </div>
            <main className="flex mt-10 w-full flex-row justify-center h-auto">
                <MusicList></MusicList>
            </main>
        </section>
    )
}