type Props = {
    value: string
    onChange: (v: string) => void
}

export default function FilterBar({ value, onChange }: Props) {
    return (
        <div className="max-w-md">
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700">
                Search resources
            </label>
            <input
                id="filter"
                type="text"
                placeholder="Filter by title or tag..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900"
            />
        </div>
    )
}