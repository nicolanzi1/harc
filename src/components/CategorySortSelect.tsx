import type { CategoryOrder } from "../utils/sort";

type Props = { value: CategoryOrder; onChange: (v: CategoryOrder) => void }

export default function CategorySortSelect({ value, onChange }: Props) {
    return (
        <div className="max-w-xs">
            <label htmlFor="cat-sort" className="block text-sm font-medium text-gray-700">
                Sort categories
            </label>
            <select
                id="cat-sort"
                value={value}
                onChange={(e) => onChange(e.target.value as CategoryOrder)}
                className="mt-1 w-full rounded-md border border-navy/20 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-navy cursor-pointer"
            >
                <option value="default">Default order</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
            </select>
        </div>
    )
}