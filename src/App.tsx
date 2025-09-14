import { useMemo, useState } from 'react'
import raw from './data/resources.json'
import type { Resource } from './types/Resource'
import { CATEGORIES, groupByCategory } from './utils/group'
import { sortCategories, type CategoryOrder } from './utils/sort'
import CategorySection from './components/CategorySection'
import ResourceModal from './components/ResourceModal'
import FilterBar from './components/FilterBar'
import CategorySortSelect from './components/CategorySortSelect'

export default function App({ initial }: { initial?: Resource[] }) {
  const resources = (initial ?? (raw as unknown as Resource[]))
  const [selected, setSelected] = useState<Resource | null>(null)
  const [query, setQuery] = useState('')
  const [catOrder, setCatOrder] = useState<CategoryOrder>('default')
  
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return resources
    return resources.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)),
    )
  }, [query, resources])

  const grouped = useMemo(() => groupByCategory(filtered), [filtered])

  const visibleCats = useMemo(
    () => CATEGORIES.filter((c) => grouped[c].length > 0),
    [grouped]
  )

  const orderedCats = useMemo(
    () => sortCategories(visibleCats, catOrder, CATEGORIES),
    [visibleCats, catOrder]
  )

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <header className="space-y-4 rounded-2xl bg-gradient-to-r from-purple/20 to-teal/20 p-4">
        <h1 className="text-2xl font-bold text-navy">Health Assured Resource Centre</h1>
        <p className="text-navy/70">Curated resources, grouped by category.</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
          <FilterBar value={query} onChange={setQuery} />
          <CategorySortSelect value={catOrder} onChange={setCatOrder} />
        </div>
      </header>

      {orderedCats.length === 0 ? (
        <p role="status" aria-live="polite" className="text-gray-600 italic">
          No results. Try a different search.
        </p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {orderedCats.map((cat) => (
            <CategorySection key={cat} title={cat} items={grouped[cat]} onOpen={setSelected} />
          ))}
        </div>
      )}

      {selected && <ResourceModal resource={selected} onClose={() => setSelected(null)} />}
    </main>
  )
}