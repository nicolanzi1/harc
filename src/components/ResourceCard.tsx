import type { Resource } from '../types/Resource'
type Props = { resource: Resource; onOpen: (r: Resource) => void }

export default function ResourceCard({ resource, onOpen }: Props) {
    return(
        <li
            role="listitem"
            className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition"
        >
            <button onClick={() => onOpen(resource)} aria-haspopup="dialog" className="block w-full text-left focus:outline-none cursor-pointer">
                {resource.thumbnail ? (
                    <img
                        src={resource.thumbnail}
                        alt={resource.title}
                        className='h-40 w-full object-cover'
                        loading='lazy'
                    />
                ) : (
                    <div aria-hidden className="h-40 w-full bg-gray-100" />
                )}
                <div className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium leading-snug text-navy">{resource.title}</h3>
                        <span className="ml-3 srhink-0 rounded-full px-2 py-1 text-xs bg-purple/10 text-purple">
                            {resource.category}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {resource.tags.map((t, i) => (
                            <span
                                key={`${resource.id}-${i}-${t}`}
                                className="text-xs px-2 py-0.5 rounded-full bg-teal/10 text-navy/80"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                    <p className="text-xs text-navy/60">
                        {resource.duration} min - {new Date(resource.date_uploaded).toLocaleDateString()}
                    </p>
                </div>
            </button>
        </li>
    )
}