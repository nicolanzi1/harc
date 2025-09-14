import type { Category } from "../types/Resource";

export type CategoryOrder = 'default' | 'az' | 'za'


export function sortCategories(
    cats: Category[],
    order: CategoryOrder,
    defaultOrder: Category[],
): Category[] {
    if (order === 'default') {
        return [...cats].sort((a, b) => defaultOrder.indexOf(a) - defaultOrder.indexOf(b))
    }
    if (order === 'az') return [...cats].sort((a, b) => a.localeCompare(b))
    return [...cats].sort((a, b) => b.localeCompare(a))
}