import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('Details on click', () => {
    it('opens a dialog and closes on Escape', async () => {
        render(<App />)
        
        const cards = screen.getAllByRole('button', { name: /.+/ })
        fireEvent.click(cards[0])
        
        expect(await screen.findByRole('dialog')).toBeInTheDocument()

        fireEvent.keyDown(document, { key: 'Escape' })
        expect(screen.queryByRole('dialog')).toBeNull()
    })
})