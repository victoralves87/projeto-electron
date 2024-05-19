export default function ImportFiles() {
    return (
        <div className="mb-3">
            <label htmlFor="formFileMultiple" className="block text-lg font-medium text-gray-400 mb-1">
                Importar Músicas
            </label>
            <input
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid bg-clip-padding px-3 py-[0.32rem] text-base font-normal file:-mx-3 file:-my-[0.32rem] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none border-neutral-600 text-neutral-200 file:bg-neutral-700 file:text-neutral-100"
                type="file"
                id="formFileMultiple"
                multiple
                accept=".mp3, .wav"
            />
        </div>
    );
}
