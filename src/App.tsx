import { useMemo, useState } from 'react'
import data from './data/resources.json'
import type { Resource } from './types/Resource'
import { CATEGORIES, groupByCategory } from './utils/group'
import CategorySection from './components/CategorySection'
import ResourceModal from './components/ResourceModal'
import FilterBar from './components/FilterBar'

const resources = data as unknown as Resource[]

export default function App() {
  const [selected, setSelected] = useState<Resource | null>(null)
  const [query, setQuery] = useState('')
  
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return resources
    return resources.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q)),
    )
  }, [query])

  const grouped = useMemo(() => groupByCategory(filtered), [filtered])
  const visibleCats = useMemo(
    () => CATEGORIES.filter((c) => grouped[c].length > 0),
    [grouped]
  )

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Health Assured Resource Centre</h1>
        <p className="text-gray-600">Curated resources, grouped by category.</p>
        <FilterBar value={query} onChange={setQuery} />
      </header>
      {visibleCats.length === 0 ? (
        <p role="status" aria-live="polite" className="text-gray-600 italic">
          No results. Try a different search.
        </p>
      ): (
        <div className="space-y-10">
          {visibleCats.map((cat) => (
            <CategorySection key={cat} title={cat} items={grouped[cat]} onOpen={setSelected} />
          ))}
      </div>
      )}
      {selected && <ResourceModal resource={selected} onClose={() => setSelected(null)} />}
    </main>
  )
}