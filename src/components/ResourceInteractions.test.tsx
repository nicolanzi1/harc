import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('Details on click', () => {
    it('opens a dialog and closes on Escape', async () => {
        render(<App />)
        const user = userEvent.setup()
        const cards = screen.getAllByRole('button', { name: /.+/ })

        await user.click(cards[0])
        await screen.findByRole('dialog')
        await user.keyboard('{Escape}')

        await waitFor(() => {
            expect(screen.queryByRole('dialog')).toBeNull()
        })
    })
})