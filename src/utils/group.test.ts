import { describe, it, expect } from 'vitest'
import data from '../data/resources.json'
import type { Resource } from '../types/Resource'
import { CATEGORIES, groupByCategory } from './group'

const resources = data as unknown as Resource []

describe('groupByCategory', () => {
    it('returns all categories as keys',() => {
        const grouped = groupByCategory(resources)
        expect(Object.keys(grouped)).toEqual(CATEGORIES)
    })

    it('puts every resource into exactly one matching category', () => {
        const grouped = groupByCategory(resources)
        const total = CATEGORIES.reduce((sum, c) => sum + grouped[c].length, 0)
        expect(total).toBe(resources.length)
        for (const c of CATEGORIES) grouped[c].forEach(r => expect(r.category).toBe(c))
    })
})