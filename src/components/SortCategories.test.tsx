import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from '../App'
import type { Resource } from '../types/Resource'

const dataset: Resource[] = [
    { id: 'p1', category: 'Podcasts', title: 'P', thumbnail: '', tags: [], duration: 1, description: '', date_uploaded: '2025-01-01'},
    { id: 'a1', category: 'Articles', title: 'A', thumbnail: '', tags: [], duration: 1, description: '', date_uploaded: '2025-01-01'},
    { id: 'f1', category: 'Fitness', title: 'F', thumbnail: '', tags: [], duration: 1, description: '', date_uploaded: '2025-01-01'},
]

function regionOrder() {
    return screen.getAllByRole('region').map((r) =>
        within(r).getByRole('heading', { level: 2 }).textContent
    )
}

describe('Sort categories', () => {
    it('changes category section order (default -> A-Z -> Z-A', async () => {
        render(<App initial={dataset} />)
        const user = userEvent.setup()
        expect(regionOrder()).toEqual(['Podcasts', 'Articles', 'Fitness'])

        const select = screen.getByLabelText(/sort categories/i)
        await user.selectOptions(select, 'A-Z')
        expect(regionOrder()).toEqual(['Articles', 'Fitness', 'Podcasts'])

        await user.selectOptions(select, 'Z-A')
        expect(regionOrder()).toEqual(['Podcasts', 'Fitness', 'Articles'])
    })
})