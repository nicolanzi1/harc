import type { Category, Resource } from "../types/Resource";

export const CATEGORIES: Category[] = [
    'Podcasts', 'Articles', 'Newsletters', 'Recipes', 'Fitness', 'Meditation'
]

export type Grouped = Record<Category, Resource[]>

export function groupByCategory(items: Resource[]): Grouped {
    const grouped = CATEGORIES.reduce((acc: Grouped, cat: Category) => {
        acc[cat] = [] as Resource[]
        return acc
    }, {} as Grouped)

    for (const r of items) {
        if (!r.category) {
            throw new Error(`Missing "Category" on resource id=${r.id ?? 'unknown'} title="${r.title ?? ''}"`)
        }
        if (!(r.category in grouped)) {
            throw new Error(`Unknown category "${r.category}" on id=${r.id ?? 'unknown'} title="${r.title ?? ''}"}`)
        }
        grouped[r.category as Category].push(r)
    }
    return grouped
}