import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('Filter', () => {
    it('filters by title', async () => {
        render(<App />)
        const input = screen.getByLabelText(/search resources/i)

        await userEvent.type(input, 'sleep')
        expect(screen.getByText(/The Science of Sleep/i)).toBeInTheDocument()
        expect(screen.queryByText(/Mindful Moments/i)).toBeNull()
    })

    it('filters by tag', async () => {
        render (<App />)
        const input = screen.getByLabelText(/search resources/i)

        await userEvent.clear(input)
        await userEvent.type(input, 'energy')
        expect(screen.getByText(/Energy Boost Smoothie/i)).toBeInTheDocument()
        expect(screen.queryByText(/Guided Meditation for Stress Relief/i)).toBeNull()
    })

    it('hides empty categories when filtering', async () => {
        render(<App />)
        const user = userEvent.setup()
        const input = screen.getByLabelText(/search resources/i)

        await user.clear(input)
        await user.type(input, 'energy')

        expect(screen.getByRole('region', { name: 'Recipes' })).toBeInTheDocument()
        expect(screen.getByRole('region', { name: 'Fitness' })).toBeInTheDocument()
        expect(screen.queryByRole('region', { name: 'Podcasts' })).toBeNull()
        expect(screen.queryByRole('region', { name: 'Articles' })).toBeNull()
        expect(screen.queryByRole('region', { name: 'Newsletters' })).toBeNull()
        expect(screen.queryByRole('region', { name: 'Meditation' })).toBeNull()
    })

    it('shows a No results message when nothing matches', async () => {
        render(<App />)
        const user = userEvent.setup()
        const input = screen.getByLabelText(/search resources/i)

        await user.clear(input)
        await user.type(input, 'zzz-nope')
        expect(screen.getByRole('status')).toHaveTextContent(/no results/i)
        expect(screen.queryAllByRole('region')).toHaveLength(0)
    })
})