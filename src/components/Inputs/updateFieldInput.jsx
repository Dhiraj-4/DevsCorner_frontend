export function UpdateField({ id, value, onChange, placeholder, rows=1 }) {
    return (
        <textarea
            id={id || undefined }
            value={value}
            rows={rows}
            required
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="rounded-xl overflow-hidden px-4 py-2 text-sm md:text-base bg-background text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring/50 resize-none shadow-sm"
        />
    )
}