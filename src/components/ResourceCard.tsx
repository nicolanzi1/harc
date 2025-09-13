import type { Resource } from '../types/Resource'

type Props = { resource: Resource }

export default function ResourceCard({ resource }: Props) {
    return(
        <li
            role="listitem"
            className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
        >
            <img
                src={resource.thumbnail}
                alt={resource.title}
                className='h-40 w-full object-cover'
                loading='lazy'
            />
            <div className="p-3 space-y-2">
                <h3 className="font-medium leading-snug">{resource.title}</h3>
                <div className="flex flex-wrap gap-1">
                    {resource.tags.map((t, i) => (
                        <span
                            key={`${resource.id}-${i}-${t}`}
                            className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700"
                        >
                            {t}
                        </span>
                    ))}
                </div>
                <p className="text-xs text-gray-500">
                    {resource.duration} min - {new Date(resource.date_uploaded).toLocaleDateString()}
                </p>
            </div>
        </li>
    )
}