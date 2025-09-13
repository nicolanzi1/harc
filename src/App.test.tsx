// @vitest-environment jsdom
import { render, screen, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'
import data from './data/resources.json'
import type { Resource } from './types/Resource'
import { CATEGORIES, groupByCategory } from './utils/group'

describe('App grouped UI', () => {
    it('renders all category headings and correct counts', () => {
        render(<App />)
        const grouped = groupByCategory(data as unknown as Resource[])
        for (const cat of CATEGORIES) {
            const region = screen.getByRole('region', { name: cat })
            const cards = within(region).getAllByRole('listitem')
            expect(cards.length).toBe(grouped[cat].length)
        }
    })
})