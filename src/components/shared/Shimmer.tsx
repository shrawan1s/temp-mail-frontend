export default function Shimmer() {
    return (
        <div className="absolute inset-0 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/50 animate-shimmer" />
        </div>
    )
}