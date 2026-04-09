import { render, screen } from '@testing-library/react'
import IndexPage from '../../pages/index'

describe('Index page', () => {
  it('renders header', () => {
    render(<IndexPage />)
    expect(screen.getByText(/welcome to squad/i)).toBeInTheDocument()
  })
})

