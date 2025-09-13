import { useState } from 'react'
import data from './data/resources.json'
import type { Resource } from './types/Resource'
import { CATEGORIES, groupByCategory } from './utils/group'
import CategorySection from './components/CategorySection'
import ResourceModal from './components/ResourceModal'

const resources = data as unknown as Resource[]

export default function App() {
  const grouped = groupByCategory(resources)
  const [selected, setSelected] = useState<Resource | null>(null)

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Health Assured Resource Centre</h1>
        <p className="text-gray-600">Curated resources, grouped by category.</p>
      </header>

      <div className="space-y-10">
        {CATEGORIES.map((cat) => (
          <CategorySection key={cat} title={cat} items={grouped[cat]} onOpen={setSelected} />
        ))}
      </div>

      {selected && <ResourceModal resource={selected} onClose={() => setSelected(null)} />}
    </main>
  )
}