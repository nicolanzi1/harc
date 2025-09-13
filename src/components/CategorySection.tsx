import type { Category, Resource } from "../types/Resource";
import ResourceCard from "./ResourceCard";

type Props = { title: Category; items: Resource[] }

export default function CategorySection({ title, items }: Props) {
    const headingId = `h-${title}`
    return (
        <section aria-labelledby={headingId} className="space-y-3">
            <h2 id={headingId} className="text-lg font-semibold tracking-tight">
                {title}
            </h2>
            <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((r) => (
                    <ResourceCard key={r.id} resource={r} />
                ))}
            </ul>
        </section>
    )
}