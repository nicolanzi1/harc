import { useEffect } from "react";
import type { Resource } from "../types/Resource";

type Props = { resource: Resource; onClose: () => void }

export default function ResourceModal({ resource, onClose }: Props) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [onClose])

    const titleId = 'resource-dialog-title'
    const descId = 'resource-dialog-desc'

    return (
        <div role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descId} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white max-w-lg w-[90vw] rounded-xl shadow-lg overflow-hidden">
                <img src={resource.thumbnail} alt="" className="h-48 w-full object-cover" />
                <div className="p-4 space-y-2">
                    <h2 id={titleId} className="text-xl font-semibold">{resource.title}</h2>
                    <p id={descId} className="text-sm text-gray-700">{resource.description}</p>
                    <div className="flex flex-wrap gap-1">
                        {resource.tags.map((t, i) => (
                            <span key={`${resource.id}-modal-${i}-${t}`} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">{t}</span>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500">
                        {resource.duration} min - {new Date(resource.date_uploaded).toLocaleDateString()}
                    </p>
                    <div className="pt-2">
                        <button onClick={onClose} className="px-3 py-2 rounded-md bg-gray-900 text-white cursor-pointer">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}