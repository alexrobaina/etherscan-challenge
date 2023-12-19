import { describe, it, expect } from 'vitest'

import { BaseLoading } from '../../../../components/common/BaseLoading'
import { render, screen } from '../../../test-utils'

describe('BaseLoading Component', () => {
  it('renders the loading component', () => {
    render(<BaseLoading />)
    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument()
  })

  it('has the correct size class when large is true', () => {
    render(<BaseLoading large />)
    const svg = screen.getByRole('status').querySelector('svg')
    expect(svg).toHaveClass('w-8 h-8')
  })

  it('has the correct size class when large is false', () => {
    render(<BaseLoading />)
    const svg = screen.getByRole('status').querySelector('svg')
    expect(svg).toHaveClass('w-4 h-4')
  })
})
