export function OnCancelButton({ onClick, text }) {
    return (
        <button
            onClick={onClick}
            className="px-4 py-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition"
        >
            {text}
        </button>
    );
}