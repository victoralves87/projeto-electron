export default function NextIcon({ onClick }) {
    return (
        <svg
            onClick={onClick}
            className="w-6 h-6 text-white hover:text-blue-500 transition-transform transform hover:scale-110 active:scale-95 cursor-pointer"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8 4.5C8 4.08579 8.33579 3.75 8.75 3.75H9C9.20711 3.75 9.41421 3.79289 9.59462 3.87495L17.3446 8.37495C17.7221 8.57028 17.7221 9.11671 17.3446 9.31205L9.59462 13.8121C9.41421 13.8941 9.20711 13.937 9 13.937H8.75C8.33579 13.937 8 13.6012 8 13.187V4.5Z"
                fill="currentColor"
                stroke="currentColor"
            />
        </svg>
    );
}
