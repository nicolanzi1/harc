import { useEffect, useRef } from "react";
import type { Resource } from "../types/Resource";

type Props = { resource: Resource; onClose: () => void }

export default function ResourceModal({ resource, onClose }: Props) {
    const closeBtnRef = useRef<HTMLButtonElement>(null)
    const prevActiveRef = useRef<HTMLElement | null>(null)
    const prevOverflow = document.body.style.overflow
    const titleId = 'resource-dialog-title'
    const descId = 'resource-dialog-desc'

    useEffect(() => {
        prevActiveRef.current = document.activeElement as HTMLElement | null
        const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0)

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = prevOverflow || ''
            prevActiveRef.current?.focus()
            window.clearTimeout(t)
        }
    }, [onClose])

    return (
        <div role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descId} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
            <div
                className="relative z-10 w-[93vw] max-w-lg overflow-hidden rounded-xl bg-white shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                {resource.thumbnail ? (
                    <img src={resource.thumbnail} alt="" decoding="async" className="h-48 w-full object-cover" />
                ) : (
                    <div aria-hidden="true" className="h-48 w-full bg-gray-100" />
                )}
                
                <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                        <h2 id={titleId} className="text-xl font-semibold text-navy">{resource.title}</h2>
                        <span className="ml-3 srhink-0 rounded-full bg-purple/10 px-2 py-1 text-xs text-purple">
                            {resource.category}
                        </span>
                    </div>
                    <p id={descId} className="text-sm text-gray-700">{resource.description}</p>
                    <div className="flex flex-wrap gap-1">
                        {resource.tags.map((t, i) => (
                            <span key={`${resource.id}-modal-${i}-${t}`} className="text-xs px-2 py-1 rounded-full bg-teal/10 text-navy/80">{t}</span>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500">
                        {resource.duration} min - {new Date(resource.date_uploaded).toLocaleDateString()}
                    </p>
                    <div className="pt-2">
                        <button ref={closeBtnRef} onClick={onClose} className="px-3 py-2 rounded-md bg-navy/90 text-white text-sm cursor-pointer">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}