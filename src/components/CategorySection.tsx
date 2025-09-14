import type { Category, Resource } from "../types/Resource";
import ResourceCard from "./ResourceCard";

type Props = { title: Category; items: Resource[]; onOpen: (r: Resource) => void }

export default function CategorySection({ title, items, onOpen }: Props) {
    const headingId = `h-${title}`
    return (
        <section aria-labelledby={headingId} className="py-2 flex h-full flex-col">
            <h2 id={headingId} className="text-lg font-semibold tracking-tight">
                {title}
            </h2>
            <ul role="list" className="mt-3 grid grow">
                {items.map((r) => (
                    <ResourceCard key={r.id} resource={r} onOpen={onOpen} />
                ))}
            </ul>
        </section>
    )
}