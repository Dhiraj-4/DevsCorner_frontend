export function OnSaveButton({ onClick, text }) {

    return (
        <button
            onClick={onClick}
            className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition"
        >
            {text}
        </button>
    );
}